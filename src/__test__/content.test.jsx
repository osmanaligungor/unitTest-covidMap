import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Content from "../pages/detail/Content";
import { thunk } from "redux-thunk";
import { exampleCountryDetail } from "../utils/constants";

// sahte store'lar oluşturmamızı sağlayacak metodu elde ettik
const mockStore = configureStore([thunk]);

test("store yüklenme durumundayken ekrana loader geliyor mu?", () => {
  const store = mockStore({ isLoading: true, error: null, data: null });

  render(
    <Provider store={store}>
      <Content />
    </Provider>
  );

  // ekrana loader componenti geliyor mu?
  screen.getAllByTestId("content-loader");
});

test("store hata durumundayken ekrana error geliyor mu?", () => {
  const store = mockStore({
    isLoading: false,
    error: "Zaman Aşımı",
    data: null,
  });

  render(
    <Provider store={store}>
      <Content />
    </Provider>
  );

  // ekrana error componenti geliyor mu?
  screen.getAllByTestId("error");
});

test("store'a veri geldiği durumda ekrana nesnedeki her bir değer için card basılıyor mu?", () => {
  const store = mockStore({
    isLoading: false,
    error: false,
    data: exampleCountryDetail,
  });

  render(
    <Provider store={store}>
      <Content />
    </Provider>
  );

  // data nesnesini diziye çevir
  const arr = Object.entries(exampleCountryDetail).filter(
    (i) => i[0] !== "flags"
  );

  // dizideki her bir değer için kart içerisinde bilgiler basılır
  arr.forEach((item) => {
    // ekrana item'ın key değerleri geliyor mu?
    screen.getByText(item[0]);

    // ekrana item'ın value değerleri geliyor mu?
    screen.getByText(item[1]);
  });
});
