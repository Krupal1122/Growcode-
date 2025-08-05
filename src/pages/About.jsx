import React from 'react';

export default function About() {
  return (
    <section className="dark:text-white transition-all duration-300 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section with Image and Text Side by Side */}
        <section className="py-16 px-4">
          <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-center gap-8 max-w-5xl mx-auto text-center lg:text-left">
            <img
              src="https://images.rawpixel.com/image_png_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEwL3Jhd3BpeGVsb2ZmaWNlN18zZF9zdHlsZV9ib3lfc2F5aW5nX2hlbGxvX3dpdGhfc21pbGVfaXNvbGF0ZWRfb19iOGQxN2Y5YS05MmY0LTRiYjAtOWJiYy04YTQwZmUxMmI4Y2JfMS5wbmc.png"
              alt="Avatar"
              className="w-32 h-32 rounded-full bg-slate-200"
            />

            <div>
              <p className="text-blue-500 font-semibold text-lg mb-2">Hey, We're Semicolon Solution</p>
              <h1 className="text-2xl md:text-4xl font-bold">
                We work with our clients to make their vision true with our
                <span className="text-blue-500"> innovative development</span>
                <br />
                <span className="text-blue-500">and marketing services</span>
              </h1>
            </div>
          </div>

          <div className="mt-10">
            <div className="w-8 h-12 border-2 border-black rounded-full mx-auto flex items-center justify-center">
              <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
            </div>
          </div>
        </section>

        {/* About Content */}
        <div className="overflow-hidden bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
            <div className="max-w-4xl">
              <p className="text-base/7 font-semibold text-indigo-600"></p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                On a mission to empower remote teams
              </h1>
              <p className="mt-6 text-xl/8 text-balance text-gray-700">
                Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget
                aliquam. Quisque id at vitae feugiat egestas.
              </p>
            </div>

            <section className="mt-20 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
             <div className='flex'>
             <div className="lg:pr-8 w-[600px] mr-30">
                <h2 className="text-2xl font-semibold tracking-tight text-pretty text-gray-900">Who we are</h2>
                <p className="mt-6 text-base/7 text-gray-600">
                We're a team of creative minds that work hard to achieve our client's goal. We have been offering our innovative technical solutions to businesses of all sizes since 2019 that help our clients streamline their operations and increase their profitability.
                At Semicolon Solutions, we believe in the power of technology to transform businesses. That's why we offer a wide range of services that leverage the latest technologies, such as artificial intelligence, machine learning, and data analytics.
                </p>
                <p className="mt-8 text-base/7 text-gray-600">
                Our services include software development, web design, mobile app development, cloud computing, cybersecurity, and IT consulting.
                In our professional career, we have worked with various clients from Australia, the USA, the UK, Europe, and Canada.
                </p>
                <p className="mt-8 text-base/7 text-gray-600">
                GrowCode is a passionate IT company that specializes in turning complex problems into simple, scalable digital solutions. We’re collaborative, client-focused, and committed to quality — making us the ideal tech partner for startups and enterprises alike.
                </p>
                <p className="mt-8 text-base/7 text-gray-600">
                GrowCode is a dynamic IT services company that transforms ideas into powerful digital solutions. We specialize in building mobile apps, websites, and custom software that help businesses grow and stay ahead in today’s fast-paced digital world.

We’re not just developers — we’re your technology partners. Our team is made up of creative thinkers, skilled engineers, and problem-solvers who are passionate about delivering high-quality, scalable, and user-friendly solutions.

At GrowCode, we believe in innovation, collaboration, and putting our clients first. Whether you’re a startup building your first product or an established business looking to scale, we’re here to guide you every step of the way.


                </p>
              </div>

              <div className="pt-16 lg:row-span-2 lg:-mr-16 xl:mr-auto">
                <div className="-mx-8 ml-20 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 w- lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
                  {[
                    "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?&auto=format&fit=crop&crop=center&w=560&h=560&q=90",
                    "https://images.unsplash.com/photo-1557804506-669a67965ba0?&auto=format&fit=crop&crop=left&w=560&h=560&q=90",
                    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?&auto=format&fit=crop&crop=left&w=560&h=560&q=90",
                    "https://images.unsplash.com/photo-1598257006458-087169a1f08d?&auto=format&fit=crop&crop=center&w=560&h=560&q=90"
                  ].map((src, index) => (
                    <div
                      key={index}
                      className={`aspect-square overflow-hidden rounded-xl w-72  shadow-xl outline-1 -outline-offset-1 outline-black/10 ${index % 2 !== 0 ? "lg:-mt-40 -mt-8" : ""}`}
                    >
                      <img src={src} alt="" className="block size-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
             </div>
            </section>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <section className="text-gray-600 body-font">
          <div className="container px-6 py-24 mx-auto">
            <h1 className="text-3xl font-medium title-font text-gray-900 dark:text-white mb-12 text-center">
              Why Choose Us?
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[{
                title: "Opinion Research And Analysis",
                description: "We analyze market patterns to understand preferences and current trends to give you valuable insights.",
              }, {
                title: "Transparency And Ease Of Work",
                description: "Our team ensures transparency and efficiency, working closely with clients on digital platforms.",
              }, {
                title: "Negotiation And Power",
                description: "We focus on planning and executing successful negotiations to ensure long-term business success.",
              }, {
                title: "Creative And Innovative Solutions",
                description: "We turn creative ideas into reality with innovative solutions that help transform businesses."
              }].map((item, index) => (
                <div
                  key={index}
                  className="p-8 bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="block w-10 h-10 text-indigo-600 mb-4"
                    viewBox="0 0 975.036 975.036"
                  >
                    <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="leading-relaxed mt-4 text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
