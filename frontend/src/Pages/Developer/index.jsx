import { Helmet } from "react-helmet";

const Developers = () => {
  const developers = [
    {
      name: "Sameer Anand",
      designation: "Frontend Engineer @Mool Innovation Labs",
      imgUrl: "https://avatars.githubusercontent.com/u/89624003?v=4",
    },
  ];

  return (
    <div className="py-20 dark:bg-[#23314d]">
      <Helmet>
        <title>Developers - Acharya ERP</title>
        <meta name="description" content="This is the developer page." />
      </Helmet>
      <div className="container mx-auto px-6 desktop:px-12 xl:px-32">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-center text-2xl font-[Acharya-bold] text-gray-900 dark:text-white font-bold desktop:text-4xl">
            Persons Behind This Project
          </h2>
          <p className="text-gray-600 lg:w-8/12 lg:mx-auto dark:text-white">
            This project is developed by
            <a
              href="https://github.com/sameer2399"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700"
            >
              {" "}
              Sameer Anand{" "}
            </a>
          </p>
        </div>
        <div className="grid gap-12 items-center desktop:grid-cols-1 lg:grid-cols-1">
          {developers.map((item, index) => {
            return (
              <div key={index} className="space-y-4 text-center">
                <img
                  className="mx-auto object-cover rounded-xl desktop:w-40 desktop:h-60 lg:w-64 lg:h-64 cursor-pointer"
                  src={item.imgUrl}
                  alt={item.name}
                  loading="lazy"
                  title={item.name}
                />
                <div>
                  <h4 className="text-2xl font-bold">{item.name}</h4>
                  <span className="block text-sm text-gray-500">
                    {item.designation}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { Developers };
