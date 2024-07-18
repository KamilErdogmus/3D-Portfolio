import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { styles } from "../styles";
import EarthCanvas from "./canvas/Earth";
import { slideIn } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import { useRef, useState } from "react";

const Contact = () => {
  const formRef = useRef();
  const [form, SetForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetForm({ ...form, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_77il2tt",
        "template_isme23h",
        {
          from_name: form.name,
          to_name: "Kamil",
          from_email: form.email,
          to_email: "kamilerdogmus96@gmail.com",
          message: form.message,
        },
        "Y1oob1tL3LohQ-nAQ"
      )
      .then(
        () => setLoading(false),
        alert("Thanks you. I will get back to you as soon as possible. "),
        SetForm({ name: "", email: "", message: "" }, (err) => {
          setLoading(false), console.log(err), alert("Something went wrong!");
        })
      );
  };

  return (
    <div className="xl:ml-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
        variants={slideIn("left", "tween", 0.2, 1)}
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h2 className={styles.sectionHeadText}>Contact.</h2>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              placeholder="What is Your Name?"
              value={form.name}
              onChange={handleChange}
              name="name"
              className="bg-tertiary py-5 px-6 placeholder:text-secondary text-white outline-none border-none font-medium rounded-2xl"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              placeholder="What is Your E-mail?"
              value={form.email}
              onChange={handleChange}
              name="email"
              className="bg-tertiary py-5 px-6 placeholder:text-secondary text-white outline-none border-none font-medium rounded-2xl"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows="7"
              placeholder="What do you want to say?"
              value={form.message}
              onChange={handleChange}
              name="message"
              className="bg-tertiary py-5 px-6 placeholder:text-secondary text-white outline-none border-none font-medium rounded-2xl"
            />
          </label>
          <button
            type="submit"
            className="rounded-2xl bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-lg shadow-primary "
          >
            Send
          </button>
        </form>
      </motion.div>

      <motion.div
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
        variants={slideIn("right", "tween", 0.2, 1)}
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
