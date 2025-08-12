import React, { useEffect, useState } from 'react';
import resourceServices from '../../services/resourceServices';

function ResourceCard({ refresh }) {
  const [resources, setResources] = useState([]);

  const fetchAllResource = async () => {
    try {
      const response = await resourceServices.getResources();
      setResources(response.data);
    } catch (error) {
      console.log('error in fetch all resource', error);
    }
  };

  useEffect(() => {
    fetchAllResource();
  }, [refresh]);

  const openResource = (resource) => {
    if (resource.type === 'pdf') {
      // open pdf file in new tab
      window.open(resource.url, '_blank');
    } else if (resource.type === 'video') {
      // open video page or url
      window.open(resource.url, '_blank');
    } else {
      // open other resource link
      window.open(resource.url, '_blank');
    }
  };

  return (
    <div className="w-full max-w-[980px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
      {resources.map((resource) => (
        <div
          key={resource._id}
          className="bg-gray-200 text-black p-4 rounded shadow cursor-pointer"
          onClick={() => openResource(resource)}
        >
          {/* Show pdf icon or video thumbnail or link icon */}
          {resource.type === 'pdf' ? (
            <img
              src="https://cdn-icons-png.flaticon.com/512/337/337946.png"
              alt="pdf icon"
              className="w-20 h-20 mb-2 opacity-70 mx-auto"
            />
          ) : resource.type === 'video' ? (
            <img
              src={`https://img.youtube.com/vi/${new URL(resource.url).searchParams.get('v')}/hqdefault.jpg`}
              alt={resource.title}
              className="w-full h-auto rounded mb-2 hover:opacity-90 transition"
            />
          ) : (
            <img
              src="https://cdn-icons-png.flaticon.com/512/60/60510.png"
              alt="link icon"
              className="w-20 h-20 mb-2 opacity-70 mx-auto"
            />
          )}

          <h1 className="font-bold">{resource.title}</h1>
          <p>{resource.term?.name}</p>
          <div>{resource.category?.name}</div>
          <div className="capitalize">{resource.type}</div>
        </div>
      ))}
    </div>
  );
}

export default ResourceCard;
