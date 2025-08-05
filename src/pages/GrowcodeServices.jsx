import React from 'react';
import bgImage from "../img/pexels-photo-8962519.jpeg";

const services = [
    {
        categoryId: 1,
        categoryName: 'Mobile App Development',
        services: [
            {
                Image: 'https://img.freepik.com/premium-photo/phone-mobile-application-development-concept-mobile-internet-3d-illustration_76964-5164.jpg?w=2000',
                title: 'iOS App Development',
                description: 'Develop high-performance iOS applications tailored to your business needs.',
            },
            {
                Image: 'https://tse2.mm.bing.net/th?id=OIP.8Pe7i0MtEbtZ4kI-6z1OdAHaF7&pid=Api&P=0&h=180',
                title: 'Android App Development',
                description: 'Create robust Android applications with intuitive user experiences.',
            },
            {
                Image: 'https://tse1.mm.bing.net/th?id=OIP.Hi1JT_yA-h0um_JxnGztfgHaEI&pid=Api&P=0&h=180',
                title: 'Cross-Platform Apps',
                description: 'Leverage technologies like Flutter and React Native to build apps for both iOS and Android.',
            },
        ],
    },
    {
        categoryId: 2,
        categoryName: 'Web Development',
        services: [
            {
                Image: 'https://tse1.mm.bing.net/th?id=OIP.xi_VY54V535hztHz11VTyQHaFL&pid=Api&P=0&h=180',
                title: 'Frontend Development',
                description: 'Design stunning, responsive web interfaces using modern frameworks.',
            },
            {
                Image: 'https://tse1.mm.bing.net/th?id=OIP.tWJBwTsb8Sc3s_1ZMzihvgHaHa&pid=Api&P=0&h=180',
                title: 'Backend Development',
                description: 'Develop secure and scalable server-side applications and APIs.',
            },
            {
                Image: 'https://tse3.mm.bing.net/th?id=OIP.qNfq_R68u7XK7m8Hf3yNjQHaHX&pid=Api&P=0&h=180',
                title: 'Full Stack Development',
                description: 'Combine front-end and back-end expertise for complete web solutions.',
            },
        ],
    },
    {
        categoryId: 3,
        categoryName: 'Cloud Solutions',
        services: [
            {
                Image: 'https://tse3.mm.bing.net/th?id=OIP.O9SeUhlXY-tFJ7bmjL5o5gHaFj&pid=Api&P=0&h=180',
                title: 'AWS & Azure Services',
                description: 'Leverage cloud platforms for scalable infrastructure and services.',
            },
            {
                Image: 'https://tse3.mm.bing.net/th?id=OIP.VpTDX0YXrVFJf_7VUUTwtQHaEO&pid=Api&P=0&h=180',
                title: 'Cloud Migration',
                description: 'Seamlessly migrate your infrastructure to the cloud with minimal downtime.',
            },
        ],
    },
    {
        categoryId: 4,
        categoryName: 'Security Services',
        services: [
            {
                Image: 'https://tse4.mm.bing.net/th?id=OIP.Aa6dfRve6P0gK0s3yymArAHaEK&pid=Api&P=0&h=180',
                title: 'Penetration Testing',
                description: 'Identify and fix vulnerabilities in your applications.',
            },
            {
                Image: 'https://tse3.mm.bing.net/th?id=OIP.HOAsi1eVBL84w1o4jWc0gQHaEK&pid=Api&P=0&h=180',
                title: 'Security Audits',
                description: 'Conduct in-depth security assessments to ensure compliance and protection.',
            },
        ],
    },
    {
        categoryId: 5,
        categoryName: 'UI/UX & Graphic Design',
        services: [
            {
                Image: 'https://tse4.mm.bing.net/th?id=OIP.nuWfV1EsDVj5zUPxY7ta6wHaE8&pid=Api&P=0&h=180',
                title: 'UI/UX Design',
                description: 'Create intuitive and engaging user experiences for web and mobile platforms.',
            },
            {
                Image: 'https://tse3.mm.bing.net/th?id=OIP.oYePEIqoKer4bQByL3WgFwHaEo&pid=Api&P=0&h=180',
                title: 'Graphic Design',
                description: 'Design visually stunning graphics for your brand and digital products.',
            },
        ],
    },
    {
        categoryId: 6,
        categoryName: 'Digital Marketing',
        services: [
            {
                Image: 'https://tse2.mm.bing.net/th?id=OIP.9AtYwap7v7dligcoIQo51QHaE8&pid=Api&P=0&h=180',
                title: 'SEO & SEM',
                description: 'Improve your visibility on search engines and drive targeted traffic.',
            },
            {
                Image: 'https://tse1.mm.bing.net/th?id=OIP.uVGBpGnk0lIO_aba6e2ZdQHaEK&pid=Api&P=0&h=180',
                title: 'Social Media Marketing',
                description: 'Boost your brand presence on social media platforms.',
            },
        ],
    },
    {
        categoryId: 7,
        categoryName: 'Data Analytics & AI',
        services: [
            {
                Image: 'https://tse3.mm.bing.net/th?id=OIP.T6ac9a0Nt0jPutXxdc2rpgHaE7&pid=Api&P=0&h=180',
                title: 'Data Visualization',
                description: 'Transform complex data into easy-to-understand dashboards.',
            },
            {
                Image: 'https://tse4.mm.bing.net/th?id=OIP.8RKMtYp1jfldow0R2lAYrgHaFW&pid=Api&P=0&h=180',
                title: 'AI Solutions',
                description: 'Integrate machine learning models to automate and optimize your processes.',
            },
        ],
    },
    {
        categoryId: 8,
        categoryName: 'E-commerce Solutions',
        services: [
            {
                Image: 'https://tse3.mm.bing.net/th?id=OIP.ulgIUOumRK4Bvqeddju7mwHaFQ&pid=Api&P=0&h=180',
                title: 'Custom E-commerce Development',
                description: 'Build tailored e-commerce platforms that scale with your business.',
            },
            {
                Image: 'https://tse4.mm.bing.net/th?id=OIP.61YcGKt0RojS0O3vp1zyugHaE8&pid=Api&P=0&h=180',
                title: 'Shopify & WooCommerce',
                description: 'Leverage popular platforms to launch your online store quickly.',
            },
        ],
    },
    {
        categoryId: 9,
        categoryName: 'DevOps & Hosting',
        services: [
            {
                Image: 'https://tse3.mm.bing.net/th?id=OIP.lNj9bpCTkLL6lZN2sGDGmQHaE8&pid=Api&P=0&h=180',
                title: 'CI/CD Implementation',
                description: 'Streamline your development with continuous integration and delivery pipelines.',
            },
            {
                Image: 'https://tse4.mm.bing.net/th?id=OIP.8Vd8T1xuB3XTrMiSDl09FwHaEe&pid=Api&P=0&h=180',
                title: 'Cloud Hosting',
                description: 'Deploy your apps with high availability and performance.',
            },
        ],
    },
    {
        categoryId: 10,
        categoryName: 'AI & Machine Learning',
        services: [
            {
                Image: 'https://tse1.mm.bing.net/th?id=OIP.anaL1RIGN3BqazGOBpghWQHaEK&pid=Api&P=0&h=180',
                title: 'Predictive Analytics',
                description: 'Use historical data to forecast trends and behavior.',
            },
            {
                Image: 'https://tse3.mm.bing.net/th?id=OIP.UHbDZBOo2gox_16AAi0tLgHaDV&pid=Api&P=0&h=180',
                title: 'Natural Language Processing',
                description: 'Build intelligent systems that understand and generate human language.',
            },
        ],
    },
    {
        categoryId: 11,
        categoryName: 'Blockchain Solutions',
        services: [
            {
                Image: 'https://tse4.mm.bing.net/th?id=OIP.MKs8g4HL4-X7v8USaJwhQwHaEK&pid=Api&P=0&h=180',
                title: 'Smart Contract Development',
                description: 'Create secure and automated agreements on blockchain platforms.',
            },
            {
                Image: 'https://tse4.mm.bing.net/th?id=OIP.WLs-YJ9ub6pIXvDSmUO6fQHaE7&pid=Api&P=0&h=180',
                title: 'Decentralized Apps (DApps)',
                description: 'Build scalable and transparent DApps for various use cases.',
            },
        ],
    },
    {
        categoryId: 12,
        categoryName: 'Game Development',
        services: [
            {
                Image: 'https://tse3.mm.bing.net/th?id=OIP.0FrWD9H5O-EQCzeYa3UwlQHaEY&pid=Api&P=0&h=180',
                title: 'Mobile Game Development',
                description: 'Design engaging mobile games for iOS and Android devices.',
            },
            {
                Image: 'https://tse3.mm.bing.net/th?id=OIP.f1A1f3exteaEfOEKEXCorAHaEK&pid=Api&P=0&h=180',
                title: 'Unity & Unreal Engine',
                description: 'Leverage powerful game engines to bring your ideas to life.',
            },
        ],
    },
    {
        categoryId: 13,
        categoryName: 'IoT Solutions',
        services: [
            {
                Image: 'https://tse2.mm.bing.net/th?id=OIP.zQ0n_qCjMIYDF_hbd9bYJQHaE8&pid=Api&P=0&h=180',
                title: 'Embedded Software Development',
                description: 'Create software for connected devices and embedded systems.',
            },
            {
                Image: 'https://tse1.mm.bing.net/th?id=OIP.n3junqF1sccVqN4wYK6B7gHaEq&pid=Api&P=0&h=180',
                title: 'IoT Integration',
                description: 'Enable smart communication between devices and cloud platforms.',
            },
        ],
    },
    {
        categoryId: 14,
        categoryName: 'AR/VR Solutions',
        services: [
            {
                Image: 'https://tse3.mm.bing.net/th?id=OIP.2F84eHhbVi1opQDI0SA1DwHaE8&pid=Api&P=0&h=180s',
                title: 'Augmented Reality Apps',
                description: 'Enhance user experiences with AR technology.',
            },
            {
                Image: 'https://tse3.mm.bing.net/th?id=OIP.6xZwteOpgm6YXP_n5nh9awHaEK&pid=Api&P=0&h=180',
                title: 'Virtual Reality Simulations',
                description: 'Develop immersive VR applications for training, gaming, and more.',
            },
        ],
    },
    {
        categoryId: 15,
        categoryName: 'IT Consulting',
        services: [
            {
                Image: 'https://tse4.mm.bing.net/th?id=OIP.4LQVMYnLsLeTN4iZ1qMRLwHaEo&pid=Api&P=0&h=180',
                title: 'Technology Strategy',
                description: 'Define a clear IT roadmap aligned with your business goals.',
            },
            {
                Image: 'https://tse2.mm.bing.net/th?id=OIP.XojXZQ1tVbHqR9QDyMR4tQHaE8&pid=Api&P=0&h=180',
                title: 'Business Process Optimization',
                description: 'Improve efficiency and reduce costs with optimized IT processes.',
            },
        ],
    },
    {
        categoryId: 16,
        categoryName: 'Training & Support',
        services: [
            {
                Image: 'https://tse2.mm.bing.net/th?id=OIP.mAGJ6uqo4_uO9pru9kC29wHaE3&pid=Api&P=0&h=180',
                title: 'Technical Training',
                description: 'Empower your team with in-depth technical skills and workshops.',
            },
            {
                Image: 'https://tse1.mm.bing.net/th?id=OIP.jOZfvGj_DJ2VC0r1GCxIggHaHa&pid=Api&P=0&h=180',
                title: '24/7 Support Services',
                description: 'Get reliable and continuous IT support anytime you need it.',
            },
        ],
    },
    {
        categoryId: 17,
        categoryName: 'CMS Solutions',
        services: [
            {
                Image: 'https://tse2.mm.bing.net/th?id=OIP.vg2LYasfMtDpJ_CNCr0v-gHaEO&pid=Api&P=0&h=180',
                title: 'WordPress Development',
                description: 'Build SEO-friendly and easily manageable WordPress websites.',
            },
            {
                Image: 'https://tse2.mm.bing.net/th?id=OIP.m2ZDOsGNFySVrdWiKVC6TQHaJQ&pid=Api&P=0&h=180',
                title: 'Headless CMS',
                description: 'Use headless CMS systems for flexible content delivery.',
            },
        ],
    },
    {
        categoryId: 18,
        categoryName: 'API Development',
        services: [
            {
                Image: 'https://tse3.mm.bing.net/th?id=OIP.d-bFYAenpmXJsXvwcHLfrwHaD4&pid=Api&P=0&h=180',
                title: 'REST API Development',
                description: 'Build scalable REST APIs for web and mobile apps.',
            },
            {
                Image: 'https://tse1.mm.bing.net/th?id=OIP.0vR9AfgxHD0tVvS0yyCJKQHaD4&pid=Api&P=0&h=180',
                title: 'GraphQL APIs',
                description: 'Develop GraphQL APIs for flexible data access and performance.',
            },
        ],
    },
];

export default function GrowcodeServices() {
  const defaultImg = "https://via.placeholder.com/400x250?text=Service";

  return (
    <div>
      <section id="services" className=" bg-white">
        <div className="container mx-auto px-4">
        {/* <div
          className="ml-[-138px] w-[1560px] bg-cover bg-center rounded-xl overflow-hidden"
          style={{
            backgroundImage: `url(${bgImage})`,
            height: "15vh",
          }}
        >
          <div className="h-full w-full bg-white/20 dark:bg-black/60 flex items-center justify-center transition-colors duration-300">
            <p className="text-[35px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
            Services
            </p>
          </div>
        </div> */}
          <h2 className="text-4xl font-bold mb-12 mt-10 text-center text-indigo-700">
            Our Services 
          </h2>

          {services.map((data, index) => (
            <div key={index} className="mb-16">
              <h3 className="text-2xl font-semibold text-indigo-600 mb-6">
                {data.categoryName}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.services.map((service, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <img
                      src={service.Image || defaultImg}
                      alt={service.title}
                      className="w-full h-52 object-cover"
                    />
                    <div className="p-6">
                      <h4 className="text-xl font-semibold mb-2 text-gray-800">
                        {service.title}
                      </h4>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
