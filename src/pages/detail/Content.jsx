import { useDispatch, useSelector } from "react-redux";
import ContentLoader from "../../components/loader/contentLoader";
import Error from "../../components/error";
import Card from "./Card";
import { useParams } from "react-router-dom";
import { getDetails } from "../../redux/actions";

const Content = () => {
  const { code } = useParams();
  const dispatch = useDispatch();

  const { isLoading, error, data } = useSelector((store) => store);

  // data nesnesini diziye çevir
  const arr = Object.entries(data || {}).filter((i) => i[0] !== "flags");

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {isLoading ? (
        <ContentLoader />
      ) : error ? (
        <Error info={error} refetch={() => dispatch(getDetails(code))} />
      ) : (
        arr.map((item, key) => <Card key={key} item={item} />)
      )}
    </div>
  );
};

export default Content;
