import Master from "../layouts/Master";
import Home from "../components/home/Home";
import EditImage from "../components/edit_image/EditImage";

const routes = [
  {
    path: "/",
    component: Home,
    layout: Master,
    exact: true,
  },
  {
    path: "/edit-image/:image",
    component: EditImage,
    layout: Master,
    exact: true,
  },
];

export default routes;
