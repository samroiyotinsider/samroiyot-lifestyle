import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VideoPlayer } from './VideoPlayer';

describe('VideoPlayer Component', () => {
  it('renders video element with correct S3 URL', () => {
    const { container } = render(
      <VideoPlayer
        videoUrl="https://samroiyot-videos.s3.amazonaws.com/test-video.mp4"
        youtubeUrl="https://youtube.com/watch?v=test"
        autoplay={false}
        controls={true}
        showYouTubeButton={false}
      />
    );
    
    const video = container.querySelector('video');
    expect(video).toBeTruthy();
    expect(video?.src).toContain('test-video.mp4');
  });

  it('applies autoplay attribute when enabled', () => {
    const { container } = render(
      <VideoPlayer
        videoUrl="https://samroiyot-videos.s3.amazonaws.com/test-video.mp4"
        youtubeUrl="https://youtube.com/watch?v=test"
        autoplay={true}
        controls={true}
        showYouTubeButton={false}
      />
    );
    
    const video = container.querySelector('video');
    expect(video?.autoplay).toBe(true);
  });

  it('applies controls attribute when enabled', () => {
    const { container } = render(
      <VideoPlayer
        videoUrl="https://samroiyot-videos.s3.amazonaws.com/test-video.mp4"
        youtubeUrl="https://youtube.com/watch?v=test"
        autoplay={false}
        controls={true}
        showYouTubeButton={false}
      />
    );
    
    const video = container.querySelector('video');
    expect(video?.controls).toBe(true);
  });

  it('renders YouTube button when showYouTubeButton is true', () => {
    render(
      <VideoPlayer
        videoUrl="https://samroiyot-videos.s3.amazonaws.com/test-video.mp4"
        youtubeUrl="https://youtube.com/watch?v=test"
        autoplay={false}
        controls={true}
        showYouTubeButton={true}
        youtubeButtonLabel="Watch on YouTube"
      />
    );
    
    const button = screen.getByText('Watch on YouTube');
    expect(button).toBeTruthy();
  });

  it('does not render YouTube button when showYouTubeButton is false', () => {
    render(
      <VideoPlayer
        videoUrl="https://samroiyot-videos.s3.amazonaws.com/test-video.mp4"
        youtubeUrl="https://youtube.com/watch?v=test"
        autoplay={false}
        controls={true}
        showYouTubeButton={false}
      />
    );
    
    const button = screen.queryByText('Watch on YouTube');
    expect(button).toBeFalsy();
  });

  it('renders video with muted attribute for autoplay', () => {
    const { container } = render(
      <VideoPlayer
        videoUrl="https://samroiyot-videos.s3.amazonaws.com/test-video.mp4"
        youtubeUrl="https://youtube.com/watch?v=test"
        autoplay={true}
        controls={true}
        showYouTubeButton={false}
      />
    );
    
    const video = container.querySelector('video');
    expect(video?.muted).toBe(true);
  });
});
