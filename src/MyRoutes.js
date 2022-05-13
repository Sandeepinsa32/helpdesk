import React from "react";
import { Routes, Route } from "react-router-dom";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// importing components

import AddUser from "./views/Agents";
import SearchRecord from "./views/GlobalRecords";
import { Account } from "./views/Account";
import { Transaction } from "./views/MyRecords";
import Email from "./views/Email";
import Dashboard from "./views/Dashboard";
import AddNewRecord from "./views/AddNewRecord";
import Auth from "./views/Auth";
import Authorizing from "./views/Authorizing";

const data = {};
export default function RouteComponent() {
  const navigate = useNavigate();

  const Signoff = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/home" element={<h1>home</h1>}></Route>
      <Route path="/customers" element={<AddUser />}></Route>
      <Route path="/products" element={<h1>products</h1>}></Route>
      <Route path="/account" element={<Account />}></Route>
      <Route path="/setting" element={<h1>setting</h1>}></Route>
      <Route path="/my-records" element={<Transaction />}></Route>
      <Route path="/404" element={<TypoText />}></Route>
      <Route path="/all" element={<SearchRecord />}></Route>
      <Route path="/email" element={<Email />}></Route>
      <Route
        path="/add-new-record"
        element={<AddNewRecord isview={false} data={data} />}
      ></Route>
      <Route path="/logout" element={<Signoff />}></Route>
    </Routes>
  );
}

function TypoText() {
  return (
    <>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
        non enim praesent elementum facilisis leo vel. Risus at ultrices mi
        tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
        tellus. Convallis convallis tellus id interdum velit laoreet id donec
        ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
        suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
        quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
        proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
        tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
        varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
        Lorem donec massa sapien faucibus et molestie ac.
      </Typography>
      <Typography paragraph>
        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
        ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum
        integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi
        lacus sed viverra tellus. Purus sit amet volutpat consequat mauris.
        Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
        vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra
        accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac.
        Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique
        senectus et. Adipiscing elit duis tristique sollicitudin nibh sit.
        Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra
        maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
        aliquam ultrices sagittis orci a.
      </Typography>
    </>
  );
}
