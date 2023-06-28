import { all, fork } from "redux-saga/effects";
import bannerSaga from "./banner";
import userSaga from "./user";
import popupSaga from "./popup";
import companySaga from "./company";
import noticeSage from "./notice";
import gallerySage from "./gallery";
import questionSaga from "./question";
import accept from "./accept";
import editSaga from "./editor";
import logoSaga from "./logo";
import faqSaga from "./faq";
import productSaga from "./product";
import artistSaga from "./artist";
import buySaga from "./buy";
import sellerSaga from "./seller";
import categorySaga from "./category";
import tagSaga from "./tag";
import albumSaga from "./album";
import artistContactSaga from "./artistContact";
import searchSaga from "./search";
import boughtSaga from "./bought";
import likeSaga from "./like";
//
import axios from "axios";
import backURL from "../config/config";

axios.defaults.baseURL = backURL;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(bannerSaga),
    fork(userSaga),
    fork(popupSaga),
    fork(companySaga),
    fork(noticeSage),
    fork(gallerySage),
    fork(questionSaga),
    fork(accept),
    fork(editSaga),
    fork(logoSaga),
    fork(faqSaga),
    fork(productSaga),
    fork(artistSaga),
    fork(buySaga),
    fork(sellerSaga),
    fork(categorySaga),
    fork(tagSaga),
    fork(albumSaga),
    fork(artistContactSaga),
    fork(searchSaga),
    fork(boughtSaga),
    fork(likeSaga),
    //
  ]);
}
