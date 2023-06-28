import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import user from "./user";
import banner from "./banner";
import popup from "./popup";
import company from "./company";
import notice from "./notice";
import gallery from "./gallery";
import question from "./question";
import accept from "./accept";
import editor from "./editor";
import logo from "./logo";
import faq from "./faq";
import product from "./product";
import artist from "./artist";
import buy from "./buy";
import seller from "./seller";
import category from "./category";
import tag from "./tag";
import album from "./album";
import artistContact from "./artistContact";
import search from "./search";
import bought from "./bought";
import revenue from "./revenue";
import like from "./like";
import point from "./point";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log("HYDRATE", action);
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        banner,
        popup,
        company,
        notice,
        gallery,
        question,
        accept,
        editor,
        logo,
        faq,
        product,
        artist,
        buy,
        seller,
        category,
        tag,
        album,
        artistContact,
        search,
        bought,
        revenue,
        like,
        point,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
