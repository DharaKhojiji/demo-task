import Dashboard from "../Dashboard";
import Slider from "../Slider";
import AddSlider from "../AddSlider";
import Contact from "../Contact";
import About from "../About";
import Gallery from "../Gallery";
import AddGallery from "../AddGallery";
import ChangePassword from "../Auth/ChangePassword";
const  useraccess  = localStorage.getItem("user")    


const routes = [
  { exact: true, path: "/dashboard", component: Dashboard },
  { exact: true, path: "/slider", component: Slider },
  { exact: true, path: "/contact", component: Contact },
  { exact: true, path: "/addslider", component: AddSlider },
  { exact: true, path: "/about", component: About },
  { exact: true, path: "/gallery", component: Gallery },
  { exact: true, path: "/addgallery", component: AddGallery },
  { exact: true, path: "/changepassword", component: ChangePassword },
];

export default routes;
