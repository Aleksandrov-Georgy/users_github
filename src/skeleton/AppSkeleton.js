import React from 'react';
import ContentLoader from 'react-content-loader';

export const AppSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={450}
    height={500}
    viewBox="0 0 400 500"
    backgroundColor="#dedede"
    foregroundColor="#b8b8b8"
    {...props}>
    <rect x="573" y="-111" rx="0" ry="0" width="359" height="204" />
    <circle cx="58" cy="57" r="40" />
    <circle cx="363" cy="54" r="29" />
    <rect x="118" y="42" rx="10" ry="10" width="200" height="28" />
    <circle cx="59" cy="146" r="40" />
    <circle cx="364" cy="143" r="29" />
    <rect x="119" y="131" rx="10" ry="10" width="200" height="28" />
    <circle cx="60" cy="237" r="40" />
    <circle cx="365" cy="234" r="29" />
    <rect x="120" y="222" rx="10" ry="10" width="200" height="28" />
    <circle cx="62" cy="327" r="40" />
    <circle cx="367" cy="324" r="29" />
    <rect x="122" y="312" rx="10" ry="10" width="200" height="28" />
    <circle cx="62" cy="418" r="40" />
    <circle cx="367" cy="415" r="29" />
    <rect x="122" y="403" rx="10" ry="10" width="200" height="28" />
  </ContentLoader>
);
