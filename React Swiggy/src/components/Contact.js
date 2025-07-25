import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-2">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full border-t-4 border-indigo-400">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-2 text-center flex items-center justify-center gap-2">
          <FaEnvelope className="inline-block text-indigo-400" /> Contact Us
        </h1>
        <p className="text-gray-600 text-center mb-6">We'd love to hear from you! Fill out the form below or reach us directly.</p>
        <div className="flex flex-col gap-2 mb-6 text-gray-700 text-sm">
          <div className="flex items-center gap-2"><FaEnvelope className="text-indigo-400" /> support@grocerystore.com</div>
          <div className="flex items-center gap-2"><FaPhone className="text-green-500" /> +91 98765 43210</div>
          <div className="flex items-center gap-2"><FaMapMarkerAlt className="text-pink-500" /> 123, Main Street, Ahmedabad</div>
        </div>
        <form className="flex flex-col gap-4">
          <div className="flex items-center gap-2 bg-gray-50 rounded px-3 py-2 border border-gray-200 focus-within:border-indigo-400">
            <FaUser className="text-gray-400" />
            <input type="text" id="name" name="name" required placeholder="Your Name" className="bg-transparent outline-none flex-1 text-gray-700" />
          </div>
          <div className="flex items-center gap-2 bg-gray-50 rounded px-3 py-2 border border-gray-200 focus-within:border-indigo-400">
            <FaEnvelope className="text-gray-400" />
            <input type="email" id="email" name="email" required placeholder="Your Email" className="bg-transparent outline-none flex-1 text-gray-700" />
          </div>
          <textarea id="message" name="message" required placeholder="Your Message" className="bg-gray-50 rounded px-3 py-2 border border-gray-200 focus:border-indigo-400 outline-none min-h-[100px] text-gray-700"></textarea>
          <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 rounded-lg shadow transition-all">Send Message</button>
        </form>
      </div>
    </div>
  );
};

// Export the Contact component
export default Contact;

