import { render, screen } from "@testing-library/react";
import Item from "../pages/home/item";

// * normal şartlarda bir bileşeni kullanırken prop gönderiyorsanız, test ederken de aynı şekilde prop göndermeniz gerekmektedir.
// * test ortamında prop gönderirken, normalde gönderdiğiniz değerlere benzer değerler göndermelisiniz.

test("gönderilen proplar doğru şekilde kullanılır", () => {
  // bileşeni renderla
  render(<Item color="text-blue-500" text="Toplam Vaka" value="300,8M" />);

  // gerekli elementleri al (ilk olarak iconu aldık)
  const icon = screen.getByTestId("icon");

  // color propu ile gönderdiğimiz değer className'de var mı?
  expect(icon).toHaveClass("text-blue-500");

  // text propu ile gönderdiğimiz değer ekranda var mı? (Bu yöntemle hem element var mı hem de içerisinde "Toplam Vaka" yazıyor mu onu çektik. İkisi Bir arada oldu bu şekilde. Yani önce elementi çekip sonra o elementin kontrolünü yapmadık. İçerisinde "Toplam Vaka" yazan bir element var mı direkt ikisini kontrol ettik.)
  screen.getByText("Toplam Vaka");

  // value propu ile gönderdiğimiz değer ekranda var mı? (Bu yöntemle hem element var mı hem de içerisinde "300,8M" yazıyor mu onu çektik. İkisi Bir arada oldu bu şekilde. Yani önce elementi çekip sonra o elementin kontrolünü yapmadık. İçerisinde "300,8M" yazan bir element var mı direkt ikisini kontrol ettik.)
  screen.getByText("300,8M");
});
