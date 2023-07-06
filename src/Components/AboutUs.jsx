import React from 'react';

const DeveloperCard = ({ name, role, description }) => {
  return (
    <div className="max-w-xs mx-auto p-2">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden border-2 border-orange-200">
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          <h4 className="text-lg text-orange-800  font-semibold mb-2">{role}</h4>
          <p className="text-base">{description}</p>
        </div>
      </div>
    </div>
  );
};

const AboutUs = () => {
  const developers = [
    {
      name: 'Dom Anyanga',
      role: 'Full Stack Developer',
      description: 'Experienced heavy-duty technician who successfully completed a 6-month rigorous 6-month project-based training focusing on MERN (MongoDB, Express.js, React, Node.js) stack development. Eagerly pursuing a career as a Full Stack Developer to apply my newfound expertise in developing robust and scalable web applications, combining technical proficiency, a strong work ethic, and a commitment to delivering high-quality results.'
    },
    {
      name: 'Meghan Savage',
      role: 'Full Stack Developer',
      description: 'I specialize in designing intuitive user interfaces and implementing robust back-end functionality. I am dedicated to delivering high-quality code and continuously improving my skills to stay up-to-date with the latest technologies.'
    },
    {
      name: 'Another Deng',
      role: 'Full Stack Developer',
      description: 'As a full stack developer, I enjoy working on the entire application stack, from the database to the user interface. I am detail-oriented and committed to writing clean and maintainable code that delivers exceptional performance.'
    }
  ];

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">About Us</h1>
        <p className="text-lg text-center mb-4">
          Welcome to our e-commerce website! We are a dedicated group of Full Stack Developers who recently completed a rigorous 6-month project-based training focused on the MERN (MongoDB, Express.js, React, Node.js) stack. Throughout the training program, we honed our skills in full-stack web development, mastering the essential tools and technologies to build robust and dynamic applications.
        </p>

        <p className="text-lg text-center mb-4">
          With our passion for coding and an eagerness to learn, we dedicated countless hours to crafting a seamless and enjoyable shopping experience for you. From designing intuitive user interfaces to implementing secure payment gateways, we have put our newly acquired skills into practice to deliver a top-notch e-commerce solution.
        </p>

      </div>
      <div className="container mx-auto mt-12">
        <div className="flex justify-center">
          {developers.map((developer, index) => (
            <DeveloperCard
              key={index}
              name={developer.name}
              role={developer.role}
              description={developer.description}
            />
          ))}
        </div>
      </div>
      <div className="container mx-auto px-4">
        <p className="text-lg text-center mb-4">
          Thank you for visiting our website and being a part of our journey. We hope you enjoy exploring our collection of products and have a pleasant shopping experience. Your support and feedback mean a lot to us as we continue to grow and refine our skills as aspiring developers.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
