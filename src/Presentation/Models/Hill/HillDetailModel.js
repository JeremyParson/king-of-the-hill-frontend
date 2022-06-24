import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import viewHill from "../../../Domain/UseCase/Hill/ViewHill";
import { UserReducerContext } from "../../Context/UserReducerContext";

export default function HillDetailModel() {
  const [hill, setHill] = useState({});
  const [canEdit, setCanEdit] = useState(false);
  const { user } = useContext(UserReducerContext);
  const { id } = useParams();

  const handleFetch = async () => {
    let hillData = await viewHill(id);
    setHill(hillData);
    let notEmpty = hillData.hasOwnProperty("id") && user.hasOwnProperty("id");
    let isDefined = hillData !== undefined && user !== undefined;
    console.log(notEmpty, isDefined, hillData, user);
    setCanEdit(notEmpty && isDefined && user.id === hillData.user_id);
  };

  useEffect(() => {
    handleFetch();
    console.log(hill, user);
  }, []);

  return { hill, canEdit };
}
