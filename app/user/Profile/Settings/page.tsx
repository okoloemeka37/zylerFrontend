import ContentLoader from 'react-content-loader';

const MyLoader = () => (
  <ContentLoader viewBox="0 0 260 160" height={560} width={560} >
      <circle cx="50" cy="30" r="40" />
      <rect x="10" y="70" rx="3" ry="3" width="80" height="10" />
      <rect x="60" y="70" rx="3" ry="3" width="70" height="10" />
      <rect x="140" y="70" rx="3" ry="3" width="20" height="10" />
      <rect x="10" y="90" rx="3" ry="3" width="90" height="10" />
      <rect x="110" y="90" rx="3" ry="3" width="70" height="10" />
      <rect x="10" y="110" rx="3" ry="3" width="70" height="10" />
      <rect x="90" y="110" rx="3" ry="3" width="60" height="10" />
    </ContentLoader>
);

export default MyLoader;
