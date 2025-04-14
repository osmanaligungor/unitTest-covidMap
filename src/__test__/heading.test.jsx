import { render, screen } from "@testing-library/react";
import Heading from "../pages/detail/Heading";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import { exampleCountryDetail } from "../utils/constants";

// redux kullanılan bileşenleri test ederken, test edeceğimiz senaryodaki store'un sahte bir versiyonunu oluşturmalıyız.
const mockStore = configureStore([thunk]);

it("store yüklenme durumundayken ekrana loader basılır", () => {
  // bu test senaryosuna özel store'un kopyasını oluşturacağız.
  const store = mockStore({ isLoading: true, error: null, data: null });
  // bileşeni render et
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Heading />
      </BrowserRouter>
    </Provider>
  );

  // ekrana loader basılıyor mu?
  screen.getByTestId("header-loader");
});

it("store'da yüklenme bittiğinde ekranda loader yoktur", () => {
  // bu test senaryosuna özel store'un kopyasını oluşturacağız.
  const store = mockStore({ isLoading: false, error: null, data: null });

  // bileşeni renderla
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Heading />
      </BrowserRouter>
    </Provider>
  );

  // ekranda loader id'sine sahip eleman varsa al
  const loader = screen.queryByTestId("header-loader");

  // ekranda loader yoktur
  expect(loader).toBeNull();
});

it("store'a veri geldiğinde ekrana veriler basılır", () => {
  // bu test senaryosuna özel store'un kopyasını oluşturacağız.
  const store = mockStore({
    isLoading: false,
    error: null,
    data: exampleCountryDetail,
  });

  // bileşeni renderla
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Heading />
      </BrowserRouter>
    </Provider>
  );

  // ülke ismi ekrana geldi mi
  screen.getByRole("heading", { name: exampleCountryDetail.country });

  // resim ekrana geldi mi
  const img = screen.getByAltText("Flag");

  // resmin kaynağı doğru mu
  expect(img).toHaveAttribute("src", exampleCountryDetail.flags.png);
});
