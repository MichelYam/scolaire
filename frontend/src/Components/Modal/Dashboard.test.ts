// /**
//  * @jest-environment jsdom
//  */

import { render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from './index'

// describe('Given I am connected as an Admin', () => {
//     test('modal shows the children and a close button', () => {
//         // Arrange
//         const handleClose = jest.fn()

//         // Act
//         const { getByText } = render(
//             <Modal onClose={ handleClose } >
//             <div>test < /div>
//         < /Modal>,
//         )
//         // Assert
//         expect(getByText('test')).toBeTruthy()

//         // Act
//         fireEvent.click(getByText(/close/i))

//         // Assert
//         expect(handleClose).toHaveBeenCalledTimes(1)
//     })

// })
describe('When I am on Modal compendant, and I clicked on the cross', () => {
    test("Then, the modal closes", () => {

    })
})

export { }