import PageTitle from "../../Components/PageTitle";
import me2 from "./../../assets/me3.jpg";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { LuGithub } from "react-icons/lu";
import arrow from "./../../assets/arrow.png";
import MySocials from "../../Components/MySocials";
import DownloadMyResume from "../../Components/DownloadMyResume";
import { useEffect, useState } from "react";
import CredentialCard from "./CredentialCard";
import { getData } from "../../Hooks/apiUtils";
import Spinner from "./../../Components/Spinner";

const Credentials = () => {
  const [credentials, setCredentials] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const responseData = await getData("credentials/all");
        setCredentials(responseData.credentials);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-[160rem]  md:h-[100rem] ">
      <div className="md:relative mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 ">
        <div className="left md:fixed top-24 let-0  w-full col-span-2 md:col-span-1 ">
          <div
            data-aos="zoom-in-up"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1000"
            data-aos-anchor-placement="center-bottom"
            className="left p-8 w-full md:w-[30%] col-span-2 md:col-span-1 bg-gradient-to-r from-teal-950 to-gray-950 hover:to-gray-900 duration-500 rounded-lg "
          >
            <img src={me2} alt="" className="rounded-lg w-full " />
          </div>
        </div>

        {/* right section is starts from here */}
        <div className="right md:absolute right-0 w-full md:w-[66%] col-span-2 ">
          <div
            data-aos="zoom-in-up"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1000"
            data-aos-anchor-placement="center-bottom"
            className="right col-span-2 flex flex-col gap-5  "
          >
            <PageTitle title={"MY-CREDENTIALS"}></PageTitle>
            <div className="down px-8 pb-5 bg-gradient-to-r from-teal-950 to-gray-950 hover:to-gray-900 duration-500 rounded-lg">
              <img src={arrow} alt="" />
              <h1 className="text-4xl font-semibold mt-5">
                Welcome to my Credentials Showcase!
              </h1>
              <p className="mt-3 text-gray-400 text-base leading-7 ">
                Here, you will find a treasure trove of my educational
                achievements and professional successes. From degrees to
                certifications, each entry tells a story of my dedication to
                becoming the best in my field. Dive in and explore the colorful
                array of qualifications that highlight my skills and
                experiences. This is where my journey meets its milestones come,
                discover the essence of my expertise!
              </p>

              {/* social media and resume btn */}
              <div className="mdhidden mt-9 flex flex-col md:flex-row items-center justify-between gap-5 ">
                <MySocials
                  fb={<FaFacebookF></FaFacebookF>}
                  linkedin={<FaLinkedinIn></FaLinkedinIn>}
                  gh={<LuGithub></LuGithub>}
                ></MySocials>

                <DownloadMyResume></DownloadMyResume>
              </div>

              <div>
                {loading ? (
                  <Spinner />
                ) : // <div className="flex items-center justify-center w-[5rem] min-h-[50vh] mx-auto ">
                //   <img
                //     src={Spinner}
                //     alt="Loading..."
                //     className="h-full w-full"
                //   />
                // </div>
                error ? (
                  <h1>{error}</h1>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-16 ">
                    {credentials?.map((credential) => (
                      <CredentialCard
                        key={credential._id}
                        credential={credential}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Credentials;
