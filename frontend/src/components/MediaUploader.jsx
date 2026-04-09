import { useState, useRef } from 'react';
import { uploadFile, deleteFile, getFileUrl } from '../api/api';
import { FiUploadCloud, FiImage, FiFilm, FiFileText, FiTrash2, FiDownload, FiX, FiEye } from 'react-icons/fi';
import './MediaUploader.css';

const ACCEPTED = 'image/jpeg,image/jpg,image/png,image/gif,image/webp,video/mp4,video/webm,video/ogg,video/quicktime,application/pdf';

const getCategory = (fileType) => {
  if (!fileType) return 'other';
  if (fileType.startsWith('image/')) return 'image';
  if (fileType.startsWith('video/')) return 'video';
  if (fileType === 'application/pdf') return 'pdf';
  return 'other';
};

const formatSize = (bytes) => {
  if (!bytes) return '';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

const MediaUploader = ({ files, projectId, isOwner, onFilesChange }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [lightbox, setLightbox] = useState(null); // { type, url, name }
  const inputRef = useRef();

  const images = files.filter(f => getCategory(f.fileType) === 'image');
  const videos = files.filter(f => getCategory(f.fileType) === 'video');
  const pdfs = files.filter(f => getCategory(f.fileType) === 'pdf');

  const tabFiles = activeTab === 'all' ? files
    : activeTab === 'images' ? images
    : activeTab === 'videos' ? videos
    : pdfs;

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setError('');
    setUploading(true);
    setUploadProgress(`Uploading ${file.name}...`);
    try {
      await uploadFile(file, projectId);
      await onFilesChange();
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed. Check file type and size.');
    } finally {
      setUploading(false);
      setUploadProgress(null);
      e.target.value = '';
    }
  };

  const handleDelete = async (fileId) => {
    if (!window.confirm('Delete this file?')) return;
    try {
      await deleteFile(fileId);
      await onFilesChange();
    } catch (err) {
      setError('Delete failed.');
    }
  };

  const openLightbox = (file) => {
    const cat = getCategory(file.fileType);
    if (cat === 'image' || cat === 'video') {
      setLightbox({ type: cat, url: getFileUrl(file.filePath), name: file.fileName });
    } else if (cat === 'pdf') {
      window.open(getFileUrl(file.filePath), '_blank');
    }
  };

  return (
    <div className="media-uploader" id="media-uploader">
      {/* Header */}
      <div className="mu-header">
        <h3>📎 Media Files</h3>
        <div className="mu-counts">
          <span><FiImage /> {images.length}</span>
          <span><FiFilm /> {videos.length}</span>
          <span><FiFileText /> {pdfs.length}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="mu-tabs">
        {['all', 'images', 'videos', 'pdfs'].map(tab => (
          <button
            key={tab}
            className={`mu-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'all' && `All (${files.length})`}
            {tab === 'images' && `🖼 Images (${images.length})`}
            {tab === 'videos' && `🎬 Videos (${videos.length})`}
            {tab === 'pdfs' && `📄 PDFs (${pdfs.length})`}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="mu-error">
          <FiX /> {error}
          <button onClick={() => setError('')}><FiX /></button>
        </div>
      )}

      {/* Upload Zone (owner only) */}
      {isOwner && (
        <div
          className={`mu-dropzone ${uploading ? 'uploading' : ''}`}
          onClick={() => !uploading && inputRef.current.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED}
            style={{ display: 'none' }}
            onChange={handleUpload}
          />
          {uploading ? (
            <div className="mu-uploading">
              <div className="spinner" style={{ margin: '0 auto 8px' }}></div>
              <span>{uploadProgress}</span>
            </div>
          ) : (
            <>
              <FiUploadCloud className="mu-dropzone-icon" />
              <p className="mu-dropzone-title">Click to upload</p>
              <p className="mu-dropzone-hint">Images · PDFs · Videos (max 100MB)</p>
              <div className="mu-type-badges">
                <span className="mu-badge image">🖼 JPG/PNG/GIF/WebP</span>
                <span className="mu-badge pdf">📄 PDF</span>
                <span className="mu-badge video">🎬 MP4/WebM</span>
              </div>
            </>
          )}
        </div>
      )}

      {/* Grid */}
      {tabFiles.length === 0 ? (
        <div className="mu-empty">
          <p>No {activeTab === 'all' ? '' : activeTab} files yet</p>
        </div>
      ) : (
        <div className="mu-grid">
          {tabFiles.map(file => {
            const cat = getCategory(file.fileType);
            const url = getFileUrl(file.filePath);
            return (
              <div key={file.id} className={`mu-item mu-item-${cat}`}>
                {/* Preview */}
                <div className="mu-preview" onClick={() => openLightbox(file)}>
                  {cat === 'image' && (
                    <img src={url} alt={file.fileName} loading="lazy" />
                  )}
                  {cat === 'video' && (
                    <div className="mu-video-thumb">
                      <video src={url} muted preload="metadata" />
                      <div className="mu-play-icon">▶</div>
                    </div>
                  )}
                  {cat === 'pdf' && (
                    <div className="mu-pdf-thumb">
                      <FiFileText className="mu-pdf-icon" />
                      <span>PDF</span>
                    </div>
                  )}
                  <div className="mu-overlay">
                    <FiEye />
                  </div>
                </div>

                {/* Info */}
                <div className="mu-item-info">
                  <span className="mu-filename" title={file.fileName}>
                    {file.fileName?.length > 20 ? file.fileName.substring(0, 18) + '...' : file.fileName}
                  </span>
                  <span className="mu-filesize">{formatSize(file.fileSize)}</span>
                </div>

                {/* Actions */}
                <div className="mu-item-actions">
                  <a href={url} target="_blank" rel="noreferrer" className="mu-action-btn" title="Download">
                    <FiDownload />
                  </a>
                  {isOwner && (
                    <button className="mu-action-btn danger" onClick={() => handleDelete(file.id)} title="Delete">
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="mu-lightbox" onClick={() => setLightbox(null)}>
          <div className="mu-lightbox-inner" onClick={e => e.stopPropagation()}>
            <button className="mu-lightbox-close" onClick={() => setLightbox(null)}><FiX /></button>
            <p className="mu-lightbox-name">{lightbox.name}</p>
            {lightbox.type === 'image' && (
              <img src={lightbox.url} alt={lightbox.name} className="mu-lightbox-img" />
            )}
            {lightbox.type === 'video' && (
              <video src={lightbox.url} controls autoPlay className="mu-lightbox-video" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaUploader;
