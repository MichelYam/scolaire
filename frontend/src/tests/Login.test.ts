// /**
//  * @jest-environment jsdom
//  */

// import LoginUI from "../views/LoginUI";
// import Login from "../containers/Login.js";
// import { ROUTES } from "../constants/routes";
// import { fireEvent, screen } from "@testing-library/dom";

// describe("Given that I am a user on login page", () => {
//   describe("When I do not fill fields and I click on employee button Login In", () => {
//     test("Then It should renders Login page", () => {
//       document.body.innerHTML = LoginUI();

//       const inputEmailUser = screen.getByTestId("employee-email-input");
//       expect(inputEmailUser.value).toBe("");

//       const inputPasswordUser = screen.getByTestId("employee-password-input");
//       expect(inputPasswordUser.value).toBe("");

//       const form = screen.getByTestId("form-employee");
//       const handleSubmit = jest.fn((e) => e.preventDefault());

//       form.addEventListener("submit", handleSubmit);
//       fireEvent.submit(form);
//       expect(screen.getByTestId("form-employee")).toBeTruthy();
//     });
//   });

//   describe("When I do fill fields in incorrect format and I click on employee button Login In", () => {
//     test("Then It should renders Login page", () => {
//       document.body.innerHTML = LoginUI();

//       const inputEmailUser = screen.getByTestId("employee-email-input");
//       fireEvent.change(inputEmailUser, { target: { value: "pasunemail" } });
//       expect(inputEmailUser.value).toBe("pasunemail");

//       const inputPasswordUser = screen.getByTestId("employee-password-input");
//       fireEvent.change(inputPasswordUser, { target: { value: "azerty" } });
//       expect(inputPasswordUser.value).toBe("azerty");

//       const form = screen.getByTestId("form-employee");
//       const handleSubmit = jest.fn((e) => e.preventDefault());

//       form.addEventListener("submit", handleSubmit);
//       fireEvent.submit(form);
//       expect(screen.getByTestId("form-employee")).toBeTruthy();
//     });
//   });

//   describe("When I do fill fields in correct format and I click on button Login In", () => {
//     test("Then I should be in app", () => {
//       document.body.innerHTML = LoginUI();
//       const inputData = {
//         email: "johndoe@email.com",
//         password: "azerty",
//       };

//       const inputEmailUser = screen.getByTestId("employee-email-input");
//       fireEvent.change(inputEmailUser, { target: { value: inputData.email } });
//       expect(inputEmailUser.value).toBe(inputData.email);

//       const inputPasswordUser = screen.getByTestId("employee-password-input");
//       fireEvent.change(inputPasswordUser, {
//         target: { value: inputData.password },
//       });
//       expect(inputPasswordUser.value).toBe(inputData.password);

//       const form = screen.getByTestId("form-employee");

//       // localStorage should be populated with form data
//       Object.defineProperty(window, "localStorage", {
//         value: {
//           getItem: jest.fn(() => null),
//           setItem: jest.fn(() => null),
//         },
//         writable: true,
//       });

//       // we have to mock navigation to test it
//       const onNavigate = (pathname) => {
//         document.body.innerHTML = ROUTES({ pathname });
//       };

//       let PREVIOUS_LOCATION = "";

//       const store = jest.fn();

//       const login = new Login({
//         document,
//         localStorage: window.localStorage,
//         onNavigate,
//         PREVIOUS_LOCATION,
//         store,
//       });

//       const handleSubmit = jest.fn(login.handleSubmitEmployee);
//       login.login = jest.fn().mockResolvedValue({});
//       console.log(login.login)
//       form.addEventListener("submit", handleSubmit);
//       fireEvent.submit(form);
//       expect(handleSubmit).toHaveBeenCalled();
//       expect(window.localStorage.setItem).toHaveBeenCalled();
//       expect(window.localStorage.setItem).toHaveBeenCalledWith(
//         "user",
//         JSON.stringify({
//           // type: "Employee",
//           email: inputData.email,
//           password: inputData.password,
//         })
//       );
//     });

//     test("It should renders Dashboard page", () => {
//       expect(screen.getAllByText("Dashoboard")).toBeTruthy();
//     });
//   });
// });
export {}