import { BsFacebook, BsInstagram, BsPinterest, BsTwitter } from "react-icons/bs";

 const Footer =() => {
  return (
    <div className="bg-[#060D0E] px-5">
      <footer className=" text-white py-12  container mx-auto ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo and Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-12 rounded-full"><img src="/logo.png" alt="" /></div>
            <h1 className="text-3xl  poetsen-one "> <span className="text-green-600">Flora </span>Track</h1>
          </div>
          <p className="text-gray-400 poppins">
            Easy-to-follow guides for first-time plant lovers. Discover beginner-friendly plants, basic tools, and step-by-step care tips to help you grow with confidence
          </p>
          <div className="flex space-x-4 mt-4 text-lg">
            <i className="fab fa-facebook-f"> <BsFacebook /></i>
            <i className="fab fa-instagram"> <BsInstagram /></i>
            <i className="fab fa-twitter"> <BsTwitter />  </i>
            <i className="fab fa-pinterest"> <BsPinterest /></i>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h2 className="text-lg font-bold mb-4">Useful Links</h2>
          <ul className="space-y-2 text-gray-400">
            <li> About Company</li>
            <li>  Meet The Team</li>
            <li>  News & Media</li>
            <li> Our Projects</li>
            <li> Contact Us</li>
          </ul>
        </div>

        {/* Office Information */}
        <div>
          <h2 className="text-lg font-bold mb-4">Office Information</h2>
          <p className="text-gray-400 mb-4">
            4517 Washington Ave. Manchester, Kentucky 39495
          </p>
          <p className="text-green-500 mb-2">
            <i className="fas fa-envelope mr-2"></i> iamekbal75@gmail.com
          </p>
          <p className="text-green-500">
            <i className="fas fa-phone mr-2"></i> +88 123 456 7890
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-lg font-bold mb-4">News Letter</h2>
          <input
            type="email"
            placeholder="Your Email..."
            className="w-full px-4 py-2 mb-4 bg-transparent border border-gray-600 placeholder-gray-400 text-white"
          />
          <button className="w-full bg-green-600 hover:bg-green-700 py-2 font-medium rounded">
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between text-sm text-gray-500">
        <p className="text-center sm:text-left">Copyright © 2024 <span className="text-white font-medium">FloraTrack</span>, All Rights Reserved.</p>
        <div className="flex gap-4 justify-center sm:justify-end mt-4 sm:mt-0">
          <a href="#" className="hover:text-white">Trams & Condition</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
        </div>
      </div>
    </footer>
    </div>
  );
}

export default Footer;