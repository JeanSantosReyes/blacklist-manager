import { FC, useEffect, useState } from 'react';
import { deleteCustomerByNumber, getBlacklist } from '../services';
import { DebouncedInput } from '../components';
import {
    ChevronDown, ChevronLeft, ChevronRight,
    ChevronsLeft, ChevronsRight, ChevronUp, Trash2
} from 'lucide-react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table';
import Swal from 'sweetalert2';

type IAPI = {
    name: string;
    number: string;
}

const HomePage: FC = () => {

    // eslint-disable-next-line
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
    const [list, setList] = useState<IAPI[]>([]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const columnHelper = createColumnHelper<IAPI>();

    useEffect(() => {
        retrieveBlackList();
    }, []);

    const retrieveBlackList = () => {
        getBlacklist()
            .then(({ data }) => {
                setList(data);
            })
            .catch(e => console.log(e))
    }

    const deteleCustomer = (number: string) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Removerás el bloqueo del contacto.',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, remover bloqueo'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteCustomerByNumber(number)
                    .catch(error => console.log(error))
                    .finally(() => retrieveBlackList())
                Swal.fire({ title: 'Bloqueo removido', icon: 'success' });
            }
        });
    }

    const columns = [
        columnHelper.accessor((row, index) => index + 1, { // Usar el índice como ID
            id: 'id', // Especificar un id único para la columna
            header: 'ID',
            cell: ({ getValue }) => getValue()
        }),
        columnHelper.accessor('name', {
            header: 'Contacto',
            cell: ({ getValue }) => getValue()
        }),
        columnHelper.accessor('number', {
            header: 'Número',
            cell: ({ getValue }) => getValue()
        }),
        columnHelper.accessor(row => row.number, {
            header: 'Remover',
            cell: ({ getValue }) => (
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-danger' onClick={() => deteleCustomer(getValue())}>
                        <Trash2 />
                    </button>
                </div>
            ),
            enableSorting: false
        })
    ]

    const table = useReactTable({
        data: list,
        columns,
        state: {
            pagination,
            globalFilter
        },
        getCoreRowModel: getCoreRowModel(),
        onGlobalFilterChange: setGlobalFilter, //Search Global
        getFilteredRowModel: getFilteredRowModel(), //Search Global
        getPaginationRowModel: getPaginationRowModel(),//Pagination
        getSortedRowModel: getSortedRowModel(),//Order Asc. Desc.
        onPaginationChange: setPagination,////Update the pagination state
    })

    return (
        <>
            <DebouncedInput
                value={globalFilter ?? ''}
                onChange={value => setGlobalFilter(String(value))}
                className='p-2 mb-3 form-control shadow'
                placeholder='Buscar contacto...'
            />
            <table className='table table-hover table-bordered align-middle'>
                <thead className='table-light'>
                    {
                        table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {
                                    headerGroup.headers.map(header => {
                                        return (
                                            <th key={header.id} colSpan={header.colSpan} className='text-center'>
                                                {
                                                    header.isPlaceholder ? null : (
                                                        <div {...{
                                                            onClick: header.column.getToggleSortingHandler(),
                                                            role: 'button'
                                                        }}>
                                                            {
                                                                flexRender(
                                                                    header.column.columnDef.header,
                                                                    header.getContext()
                                                                )
                                                            }
                                                            {
                                                                {
                                                                    asc: <>{' '}<ChevronUp /></>,
                                                                    desc: <>{' '}<ChevronDown /></>
                                                                }
                                                                [header.column.getIsSorted() as string] ?? null
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </th>
                                        )
                                    })
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody>
                    {
                        table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {
                                    row.getVisibleCells().map(cell => (
                                        <td key={cell.id}>
                                            {
                                                flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className='d-flex align-items-center justify-content-center gap-2 mb-4'>
                <button
                    className='border rounded p-1'
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronsLeft />
                </button>
                <button
                    className='border rounded p-1'
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeft />
                </button>
                <button
                    className='border rounded p-1'
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRight />
                </button>
                <button
                    className='border rounded p-1'
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronsRight />
                </button>
                <span className='d-flex align-items-center gap-1'>
                    <div>Página</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} de{' '}
                        {table.getPageCount()}
                    </strong>
                </span>
            </div>
        </>
    )
}
export default HomePage