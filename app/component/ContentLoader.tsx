import React from 'react';
import ContentLoader from 'react-content-loader';

const ProductPageLoader = () => (
  <ContentLoader 
    speed={2}
    width="100%"
    height="100%"
    viewBox="0 0 400 600"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    uniqueKey="product-page-loader" 
  >
    {/* Product Image Placeholder */}

    <rect x="0" y="0" rx="10" ry="10" width="100%" height="300" /> 
    
    {/* Product Title */}
    <rect x="0" y="320" rx="5" ry="5" width="80%" height="30" /> 
    
    {/* Product Price */}
    <rect x="0" y="360" rx="5" ry="5" width="40%" height="25" /> 
    
    {/* Product Description */}
    <rect x="0" y="400" rx="5" ry="5" width="100%" height="15" /> 
    <rect x="0" y="420" rx="5" ry="5" width="90%" height="15" /> 
    <rect x="0" y="440" rx="5" ry="5" width="95%" height="15" /> 
    <rect x="0" y="460" rx="5" ry="5" width="85%" height="15" /> 
    
    {/* Additional Attributes */}
    <rect x="0" y="500" rx="5" ry="5" width="70%" height="20" />
    <rect x="0" y="530" rx="5" ry="5" width="90%" height="20" />
    <rect x="0" y="560" rx="5" ry="5" width="60%" height="20" />
  </ContentLoader>
);

export default ProductPageLoader;
