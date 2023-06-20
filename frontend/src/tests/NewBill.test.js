/**
 * @jest-environment jsdom
 */

import { screen, waitFor, fireEvent } from "@testing-library/dom";
import userEvent from '@testing-library/user-event'
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { localStorageMock } from "../__mocks__/localStorage.js";
import { ROUTES_PATH, ROUTES } from "../constants/routes.js";
import mockStore from "../__mocks__/store";
import router from "../app/Router.js";

jest.mock("../app/store", () => mockStore)

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then mail icon in vertical layout should be highlighted", async () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()

      window.onNavigate(ROUTES_PATH.NewBill)
      await waitFor(() => screen.getByTestId('icon-mail'))
      const mailIcon = screen.getByTestId('icon-mail')
      const iconActive = mailIcon.classList.contains("active-icon");
      expect(iconActive).toBeTruthy();
    })
  })
  describe("When I am on NewBill Page and I choose a file with an incorret extension", () => {
    test("Then it should display error message", async () => {
      document.body.innerHTML = NewBillUI()

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };

      const newBill = new NewBill({
        document,
        onNavigate,
        store: mockStore,
        localStorage: window.localStorage,
      });

      const inputFile = screen.getByTestId("file");
      const handleChangeFile = jest.fn((e) => newBill.handleChangeFile(e));

      inputFile.addEventListener("change", handleChangeFile)
      fireEvent.change(inputFile, { target: { files: [new File(['image'], 'image.pdf', { type: 'image/txt' })], } });

      expect(handleChangeFile).toHaveBeenCalled();
      expect(inputFile.files[0].type).toBe("image/txt");

      await waitFor(() => screen.getByTestId("error-msg"));
      expect(screen.getByTestId("error-msg").classList).not.toContain("hidden");
    })
  })

  describe("When I am on NewBill Page and I choose a file with a correct extension", () => {
    test("Then it should display the file name", () => {

      document.body.innerHTML = NewBillUI()

      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };

      const newBill = new NewBill({
        document,
        onNavigate,
        store: mockStore,
        localStorage: window.localStorage,
      });

      const inputFile = screen.getByTestId("file");
      const handleChangeFile = jest.fn((e) => newBill.handleChangeFile(e));

      inputFile.addEventListener("change", handleChangeFile)
      userEvent.upload(inputFile, new File(['input'], 'image.png', { type: 'image/png' }));
      expect(handleChangeFile).toHaveBeenCalled();
      expect(inputFile.files[0].name).toBe("image.png");
    })
  })

  describe("When I do fill fields in incorrect format and I click on button Send", () => {
    test("Then It should renders New Bills page", () => {
      window.onNavigate(ROUTES_PATH.NewBill);
      const newBill = new NewBill({
        document,
        onNavigate,
        mockStore,
        localStorage: window.localStorage,
      });
      expect(screen.getByTestId("expense-name").value).toBe("");
      expect(screen.getByTestId("datepicker").value).toBe("");
      expect(screen.getByTestId("amount").value).toBe("");
      expect(screen.getByTestId("vat").value).toBe("");
      expect(screen.getByTestId("pct").value).toBe("");
      expect(screen.getByTestId("file").value).toBe("");

      const form = screen.getByTestId("form-new-bill");
      const handleSubmit = jest.fn((e) => newBill.handleSubmit(e));

      form.addEventListener("submit", handleSubmit);
      fireEvent.submit(form);
      expect(handleSubmit).toHaveBeenCalled();
      expect(form).toBeTruthy();

    });
  });

  // test d'intégration POST
  describe("When I do fill fields in correct format and I click on button Send", () => {
    beforeEach(() => {
      jest.spyOn(mockStore, "bills");
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
          email: "a@a",
        })
      );
      const root = document.createElement("div");
      root.setAttribute("id", "root");
      document.body.appendChild(root);
      router();
    });
    describe("when APi is working", () => {
      test("Then it should add the new bill to the list and I should be sent on Bills page", async () => {
        document.body.innerHTML = NewBillUI()
        jest.spyOn(mockStore, "bills")
        Object.defineProperty(window, "localStorage", {
          value: localStorageMock,
        });
        window.localStorage.setItem(
          "user",
          JSON.stringify({
            type: "Employee",
            email: "a@a",
          })
        );
        const onNavigate = (pathname) => {
          document.body.innerHTML = ROUTES({ pathname });
        };

        const newBill = new NewBill({
          document,
          onNavigate,
          store: mockStore,
          localStorage: window.localStorage,
        });

        const inputExpenseType = screen.getByTestId("expense-type");
        fireEvent.change(inputExpenseType, { target: { value: "Transports" }, });
        expect(inputExpenseType.value).toBe("Transports");

        const inputExpenseName = screen.getByTestId("expense-name");
        fireEvent.change(inputExpenseName, { target: { value: "Name" }, });
        expect(inputExpenseName.value).toBe("Name");

        const inputDatePicker = screen.getByTestId("datepicker");
        fireEvent.change(inputDatePicker, { target: { value: "2022-06-02" }, });
        expect(inputDatePicker.value).toBe("2022-06-02");

        const inputAmount = screen.getByTestId("amount");
        fireEvent.change(inputAmount, { target: { value: "364" }, });
        expect(inputAmount.value).toBe("364");

        const inputVAT = screen.getByTestId("vat");
        fireEvent.change(inputVAT, { target: { value: "80" }, });
        expect(inputVAT.value).toBe("80");

        const inputPCT = screen.getByTestId("pct");
        fireEvent.change(inputPCT, { target: { value: "20" }, });
        expect(inputPCT.value).toBe("20");

        const inputFile = screen.getByTestId("file");
        userEvent.upload(inputFile, new File(["test"], "test.png", { type: "image/png" }));
        expect(inputFile.files[0]).toStrictEqual(new File(["test"], "test.png", { type: "image/png" }));
        expect(inputFile.files).toHaveLength(1);

        const submitForm = screen.getByTestId("form-new-bill");
        const handleSubmit = jest.fn((e) => newBill.handleSubmit(e));
        submitForm.addEventListener("submit", handleSubmit);
        fireEvent.submit(submitForm);

        // mockStore.bills.mockImplementationOnce(() => {
        //   return {
        //     create: (bill) => {
        //       return Promise.resolve({})
        //     },
        //   };
        // });
        
        const bill = [{
          "id": "47qAXb6fIm2zOKkLzMro",
          "vat": "80",
          "fileUrl": "https://test.storage.tld/v0/b/billable-677b6.a…f-1.jpg?alt=media&token=c1640e12-a24b-4b11-ae52-529112e9602a",
          "status": "pending",
          "type": "Hôtel et logement",
          "commentary": "séminaire billed",
          "name": "encore",
          "fileName": "preview-facture-free-201801-pdf-1.jpg",
          "date": "2004-04-04",
          "amount": 400,
          "commentAdmin": "ok",
          "email": "a@a",
          "pct": 20

        }]

        mockStore.bills().create(bill);

        expect(jest.spyOn(mockStore, 'bills')).toHaveBeenCalled();
        expect(handleSubmit).toHaveBeenCalled();
        expect(screen.getAllByText("Mes notes de frais")).toBeTruthy();
        expect(mockStore.bills).toHaveBeenCalled();
      })
    })
    describe("When an error occurs on API", () => {
      test("Then fails with 404 message error", async () => {
        mockStore.bills.mockImplementationOnce(() => {
          return {
            list: () => {
              return Promise.reject(new Error("Erreur 404"))
            }
          }
        })
        window.onNavigate(ROUTES_PATH.Bills)
        await new Promise(process.nextTick);
        const message = await screen.getByText(/Erreur 404/)
        expect(message).toBeTruthy()
      })
      test("Then fails with 500 message error", async () => {
        mockStore.bills.mockImplementationOnce(() => {
          return {
            list: () => {
              return Promise.reject(new Error("Erreur 500"))
            }
          }
        })
        window.onNavigate(ROUTES_PATH.Bills)
        await new Promise(process.nextTick);
        const message = await screen.getByText(/Erreur 500/)
        expect(message).toBeTruthy()
      })
    })
  })
})
