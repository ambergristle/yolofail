
const ImageResponseFrame = ({ children }: { children: React.ReactNode; }) => {
  
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div tw="flex flex-row items-center bg-current h-full p-2 pl-4">
        {children}
      </div>
    </div>
  );
};

export default ImageResponseFrame;
