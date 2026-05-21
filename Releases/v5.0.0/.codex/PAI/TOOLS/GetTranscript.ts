#!/usr/bin/env bun

/**
 * GetTranscript.ts - Extract transcript from YouTube video
 *
 * Usage:
 *   bun ~/.codex/skills/Videotranscript/Tools/GetTranscript.ts <youtube-url>
 *   bun ~/.codex/skills/Videotranscript/Tools/GetTranscript.ts <youtube-url> --save <output-file>
 *
 * Examples:
 *   bun ~/.codex/skills/Videotranscript/Tools/GetTranscript.ts "https://www.youtube.com/watch?v=abc123"
 *   bun ~/.codex/skills/Videotranscript/Tools/GetTranscript.ts "https://youtu.be/abc123" --save transcript.txt
 *
 * @author PAI System
 * @version 1.0.0
 */

import { execFileSync } from 'child_process';
import { writeFileSync } from 'fs';

const HELP = `
GetTranscript - Extract transcript from YouTube video using fabric

Usage:
  bun GetTranscript.ts <youtube-url> [options]

Options:
  --save <file>    Save transcript to file
  --help           Show this help message

Examples:
  bun GetTranscript.ts "https://www.youtube.com/watch?v=abc123"
  bun GetTranscript.ts "https://youtu.be/xyz789" --save ~/transcript.txt

Supported URL formats:
  - https://www.youtube.com/watch?v=VIDEO_ID
  - https://youtu.be/VIDEO_ID
  - https://www.youtube.com/watch?v=VIDEO_ID&t=123
  - https://youtube.com/shorts/VIDEO_ID
`;

// Parse arguments
const args = process.argv.slice(2);

if (args.includes('--help') || args.length === 0) {
  console.log(HELP);
  process.exit(0);
}

const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'music.youtube.com',
  'youtu.be',
]);

function normalizeYouTubeUrl(value: string): string | null {
  try {
    const parsed = new URL(value);
    const host = parsed.hostname.toLowerCase();

    if (!YOUTUBE_HOSTS.has(host)) {
      return null;
    }

    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return null;
    }

    return parsed.toString();
  } catch {
    return null;
  }
}

// Find and validate the YouTube URL before passing it to fabric.
const url = args.map(normalizeYouTubeUrl).find((value): value is string => value !== null);

if (!url) {
  console.error('❌ Error: No YouTube URL provided');
  console.log('\nUsage: bun GetTranscript.ts <youtube-url>');
  process.exit(1);
}

// Check for --save option
const saveIndex = args.indexOf('--save');
const outputFile = saveIndex !== -1 ? args[saveIndex + 1] : null;

// Extract transcript using fabric
console.log(`📺 Extracting transcript from: ${url}`);

try {
  const transcript = execFileSync('fabric', ['-y', url], {
    encoding: 'utf-8',
    timeout: 120000, // 2 minute timeout
    maxBuffer: 10 * 1024 * 1024 // 10MB buffer for long transcripts
  });

  if (!transcript.trim()) {
    console.error('⚠️ No transcript available for this video');
    process.exit(1);
  }

  console.log(`✅ Transcript extracted: ${transcript.length} characters\n`);

  if (outputFile) {
    writeFileSync(outputFile, transcript, 'utf-8');
    console.log(`💾 Saved to: ${outputFile}`);
  } else {
    console.log('--- TRANSCRIPT START ---\n');
    console.log(transcript);
    console.log('\n--- TRANSCRIPT END ---');
  }

} catch (error: any) {
  if (error.status === 1) {
    console.error('❌ Failed to extract transcript');
    console.error('Possible reasons:');
    console.error('  - Video has no captions/transcript');
    console.error('  - Video is private or restricted');
    console.error('  - Invalid URL');
  } else {
    console.error('❌ Error:', error.message);
  }
  process.exit(1);
}
