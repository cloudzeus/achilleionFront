"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const requiredString = yup.string().required();

const getI18nSchema = (t) =>
  yup
    .object({
      fullName: requiredString,
      villa: requiredString,
      email: yup.string().email().required(),
      phoneNumber: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .optional(),
      comments: requiredString,
      arrivalDate: requiredString,
      departureDate: requiredString,
    })
    .required();

export default function BookModal({ isSecondary = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [villaOptions, setVillaOptions] = useState([]);
  const {
    t,
    i18n: { language: locale },
  } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getI18nSchema(t)),
  });

  const onSubmit = (data) => console.log(data);

  const fetchVillas = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/villas?locale=${locale}`,
    );

    const data = await response.json();
    const villaOptions = data?.data?.map(({ attributes: villa, id }) => ({
      label: villa.name,
      value: id,
    }));
    setVillaOptions(villaOptions);
  };

  useEffect(() => {
    fetchVillas();
  }, [fetchVillas]);
  return (
    <>
      {isSecondary ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-[92px] h-[92px] bg-[#D9D9D9] cursor-pointer rounded-full items-center justify-center text-black flex text-[14px]"
        >
          {t("common:bookButton-secondary")}
        </button>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className=" mr-4 px-6 py-2  rounded-full bg-primary text-white text-[11px] items-center justify-center flex hover:bg-secondary"
        >
          {t("common:bookButton")}
        </button>
      )}

      {isOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0, rotate: "12.5deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#A38970]/90  text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden mt-40 md:mt-0"
            >
              <div className="relative z-10 mt-4">
                <h3 className=" text-[18px] md:text-2xl font-bold text-center mb-2">
                  Make a reservation
                </h3>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className={` pt-3 md:p-8 pb-0 w-full text-white transition-colors duration-[750ms] text-left `}
                >
                  <div className="mb-3">
                    <p className="text-[12px] mb-2">Choose a villa</p>

                    <div className="relative inline-block w-full">
                      <select
                        {...register("villa")}
                        className="block appearance-none w-full px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline  bg-[#A38970] transition-colors duration-[750ms] placeholder-white/70 border-cream border h-[30px] text-[11px]"
                      >
                        <option>Select Villa</option>
                        {villaOptions.map((villa, idx) => (
                          <option key={`villa-options${idx}`} value={villa.id}>
                            {villa.label}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-cream">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M5.516 7.548a.5.5 0 0 1 .768-.64l3.465 4.158 3.465-4.158a.5.5 0 0 1 .768.64l-3.998 4.804a.5.5 0 0 1-.768 0L5.516 7.548z" />
                        </svg>
                      </div>
                    </div>
                    <p>{errors.villa?.message}</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-[12px] mb-2">What&apos;s your name?</p>
                    <input
                      type="text"
                      {...register("fullName")}
                      placeholder="Your name..."
                      className={`bg-[#A38970] transition-colors duration-[750ms] placeholder-white/70 p-2 rounded-md w-full focus:outline-0 border-cream border h-[30px] text-[11px]`}
                    />
                    <p>{errors.fullName?.message}</p>
                  </div>
                  <div className="mb-3 flex flex-col md:flex-row gap-4">
                    <div className="w-full">
                      <p className="text-[12px] mb-2">Email Address</p>
                      <input
                        type="email"
                        {...register("email")}
                        placeholder="hello@example.com"
                        className={`bg-[#A38970] transition-colors duration-[750ms] placeholder-white/70 p-2 rounded-md w-full focus:outline-0 border-cream border h-[30px] text-[11px]`}
                      />

                      <p>{errors.email?.message}</p>
                    </div>
                    <div className="w-full">
                      <p className="text-[12px] mb-2">Phone Number</p>
                      <input
                        type="tel"
                        {...register("phoneNumber")}
                        placeholder="--- --- ----"
                        className={`bg-[#A38970] transition-colors duration-[750ms] placeholder-white/70 p-2 rounded-md w-full focus:outline-0 border-cream border h-[30px]`}
                      />
                      <p>{errors.phoneNumber?.message}</p>
                    </div>
                  </div>

                  <div className="mb-3 flex flex-col md:flex-row gap-4">
                    <div className=" w-full ">
                      <p className="text-[12px] mb-2">Arrival Date</p>
                      <input
                        type="date"
                        {...register("arrivalDate")}
                        placeholder="Arrival Date"
                        className={`bg-[#A38970] transition-colors duration-[750ms] placeholder-white/70 p-2 rounded-md w-full focus:outline-0 border-cream border h-[30px] text-[11px]`}
                      />
                      <p>{errors.arrivalDate?.message}</p>
                    </div>
                    <div className=" w-full ">
                      <p className="text-[12px] mb-2">Departure Date</p>
                      <input
                        type="date"
                        {...register("departureDate")}
                        placeholder="Your name..."
                        className={`bg-[#A38970] transition-colors duration-[750ms] placeholder-white/70 p-2 rounded-md w-full focus:outline-0 border-cream border h-[30px] text-[11px]`}
                      />
                      <p>{errors.departureDate?.message}</p>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mb-3">
                    <p className="text-[12px] mb-2">
                      Any additional info you would like to share?
                    </p>
                    <textarea
                      {...register("comments")}
                      placeholder="Comments..."
                      className={`bg-[#A38970] transition-colors duration-[750ms] min-h-[50px] resize-none placeholder-white/70 p-2 rounded-md w-full focus:outline-0 border-cream border`}
                    />
                    <p>{errors.comments?.message}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                    >
                      Nah, go back
                    </button>
                    <motion.input
                      whileHover={{
                        scale: 1.01,
                      }}
                      whileTap={{
                        scale: 0.99,
                      }}
                      onClick={() => setIsOpen(false)}
                      className="bg-white text-center hover:opacity-90 transition-opacity text-[#A38970] font-semibold w-full py-2 rounded"
                      type="submit"
                      value="Submit"
                    />
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
