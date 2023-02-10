import { useFilePicker } from 'use-file-picker';
import React, { memo } from 'react';

const FileLoader = memo(({props}) => {
  const [openFileSelector, { filesContent, loading }] = useFilePicker({
    accept: '.mid',
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={() => openFileSelector()}>Select files </button>
      <br />
      {filesContent.map((file, index) => (
        <div>
          <h2>{file.name}</h2>
          <div key={index}>{file.content}</div>
          <br />
        </div>
      ))}
    </div>
  );

});

FileLoader.displayName = 'FileLoader';

export default FileLoader;