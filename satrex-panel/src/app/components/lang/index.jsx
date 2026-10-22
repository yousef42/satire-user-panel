import React from "react";
import { useSelector } from "react-redux";
import { Store } from "../../redux/Store";
import fa from "./fa";
import en from "./en";
import ar from "./ar";
import fr from "./fr";
import gr from "./gr";

const translate = (props) => {
  const lang = useSelector((state) => state.user.language);

  const langs = {
    FA: fa(props.children),
    EN: en(props.children),
    ar: ar(props.children),
    fr: fr(props.children),
    gr: gr(props.children),
  };

  const trans = () => {
    if (langs[lang]) return langs[lang];
    return props.children;
  };

  return <>{trans()}</>;
};

export default translate;

export const transFn = (word) => {
  const lang = Store.getState().user.language;
  const langs = {
    FA: fa(word),
    EN: en(word),
    ar: ar(word),
    fr: fr(word),
    gr: gr(word),
  };
  if (langs[lang]) return langs[lang];
  return word;
};
export const isRtl =
  Store.getState().user.language === "FA" ||
  Store.getState().user.language === "ar";
export const supportedLanguages = ["FA", "EN"];
