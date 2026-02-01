import React from 'react';

/**
 * Converts text with URLs into React elements with clickable links
 * @param text - Text that may contain URLs
 * @returns Array of React nodes (text and anchor elements)
 */
export function linkify(text: string): React.ReactNode[] {
  // URL regex pattern
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = urlRegex.exec(text)) !== null) {
    const url = match[0];
    const index = match.index;

    // Add text before the URL
    if (index > lastIndex) {
      parts.push(text.substring(lastIndex, index));
    }

    // Add the clickable link
    parts.push(
      <a
        key={index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-600 hover:text-green-700 underline hover:no-underline transition-colors"
      >
        {url}
      </a>
    );

    lastIndex = index + url.length;
  }

  // Add any remaining text after the last URL
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}
