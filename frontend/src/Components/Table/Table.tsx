import React, { forwardRef, HTMLProps, useEffect, useRef, useState } from 'react'
import { useAsyncDebounce, useGlobalFilter, usePagination, useSortBy, useTable, useRowSelect } from 'react-table'
import './style.css'
// import IndeterminateCheckbox from './test'

interface IIndeterminateInputProps {
    indeterminate?: boolean;
    // name: string;
}

const IndeterminateCheckbox = forwardRef<HTMLInputElement, IIndeterminateInputProps>(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = useRef(null);
        const resolvedRef: any = ref || defaultRef;

        useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);
        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        );
    }
);

const Index = ({ columns, data }: any) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        rows,
        state,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageCount: controlledPageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        setGlobalFilter,
        selectedFlatRows,
        state: { pageIndex, pageSize, selectedRowIds },
    } = useTable({ columns, data, initialState: { pageIndex: 0 }, }, useGlobalFilter, useSortBy, usePagination, useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                // Let's make a column for selection
                {
                    id: 'selection',
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllPageRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ])
        }
    )
    const getVisiblePages = (currentPage: number, total: number) => {
        if (total <= 7) {
            const res = [];
            for (let i = 0; i < total; i++) {
                res.push(i + 1);
            }
            return res;
        } else {
            if (currentPage % 5 >= 0 && currentPage > 4 && currentPage + 2 < total) {
                return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", total];
            } else if (currentPage % 5 >= 0 && currentPage > 4 && currentPage + 2 >= total) {
                return [1, "...", total - 3, total - 2, total - 1, total];
            } else {
                return [1, 2, 3, 4, 5, "...", total];
            }
        }
    };

    const [value, setValue] = React.useState(state.globalFilter)
    const [currentPage, setCurrentPage] = useState(1)
    const [nbrElement, setnbrElement] = useState(0)
    const [pagination, setPagination] = useState<(number | string)[]>([])

    useEffect(() => {
        setPagination(
            getVisiblePages(currentPage, controlledPageCount)
        )
    }, [controlledPageCount, currentPage])
    useEffect(() => {
        const displayPage = (currentPage: number) => {
            let testest = 0
            for (let i = 1; i <= currentPage; i++) {

                if (i === currentPage) {
                    testest += page.length
                } else {
                    testest += pageSize
                }
            }
            setnbrElement(testest)
        }
        displayPage(currentPage)
    }, [currentPage, nbrElement, page.length, pageSize])
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)
    return (
        <div>
            <div className='table-search'>
                <input className="form-control" type="search" id='search' value={value || ""} placeholder="Search employee"
                    onChange={e => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    aria-controls='employee-table'
                />
                <div className=''>
                    <label className='d-flex align-items-center'>
                        Show{' '}
                        <select className="form-select form-select-sm"
                            value={pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value))
                            }}>
                            {[10, 25, 30, 50, 100].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </select>
                        {' '} entries
                    </label>
                </div>
            </div>
            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} >
                            {headerGroup.headers.map(column => (
                                <th scope="col" {...column.getHeaderProps(column.getSortByToggleProps())} >
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? <img src="../assets/img/sort_desc.png" alt="" />
                                                : <img src="../assets/img/sort_asc.png" alt="" />
                                            : null
                                        }
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()} >
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div >
                {` ${!nbrElement ? 0 : pageIndex * pageSize + 1}-${nbrElement} of ${rows.length} entries`}
            </div>
            <div>
                <nav aria-label="navigation">
                    <ul className="pagination">
                        <li className="page-item"><button className="page-link" onClick={() => {
                            previousPage()
                            setCurrentPage((prev) => prev - 1);
                        }} disabled={!canPreviousPage}>Previous</button></li>
                        {
                            pagination.map((page, index, array) => (
                                <li key={index} className="page-item">
                                    {currentPage === page ?
                                        <button className={`page-link ${currentPage === page ? "active" : ""} `} disabled>{page}</button>
                                        :
                                        page === "..." ?
                                            <button className="page-link" key={index} disabled>{page}</button>
                                            :
                                            <button className="page-link" key={index} onClick={() => {
                                                // @ts-ignore TS2564
                                                gotoPage(page - 1)
                                                // @ts-ignore TS2564
                                                setCurrentPage(page)
                                            }}>
                                                {page}
                                            </button >}
                                </li>
                            ))
                        }
                        <li className="page-item"><button className="page-link" onClick={() => {
                            nextPage()
                            setCurrentPage((prev) => prev + 1);
                        }} disabled={!canNextPage}>Next</button></li>
                    </ul>
                </nav>
            </div>
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            selectedRowIds: selectedRowIds,
                            'selectedFlatRows[].original': selectedFlatRows.map(
                                d => d.original
                            ),
                        },
                        null,
                        2
                    )}
                </code>
            </pre>
        </div >
    )
}

export default Index
