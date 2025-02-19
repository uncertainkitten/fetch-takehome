import React, { useEffect, useState } from 'react'
import { DataGrid, GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid'

const DisplayGrid = ({
    rowCount, paginationModel, handlePaginationModelChange,
    dogList, isLoading, selectedDogs, setSelectedDogs
}) => {
    const cols = [
            {...GRID_CHECKBOX_SELECTION_COL_DEF,
            width: 160,
            renderHeader: (params) =>
                <strong>
                    Add as Favorite
                </strong>
            },
            {field: 'breed', headerName: "Breed", width: 110},
            {field: 'img',
            sortable: false,
            headerName: 'Picture',
            width: 300,
            renderCell: (params) => <img src={params.value} width="300" height="300" />},
            {field: 'name', headerName: 'Name', width: 150},
            {field: 'age', headerName: 'Age', width: 100},
            {field: 'zip_code', headerName: 'Zip Code', width: 150},
        ]

    const handleRowModelChange = (newRowSelectionModel) => {
        setSelectedDogs(newRowSelectionModel)
    }

    return(
        <DataGrid
            initialState={{
                sorting: {
                    sortModel: [{ field: 'breed', sort: 'asc' }]
                }
            }}
            paginationMode="server"
            loading={isLoading}
            rowCount={rowCount}
            paginationModel={paginationModel}
            onPaginationModelChange={(e) => handlePaginationModelChange(e)}
            pageSizeOptions={[25]}
            getRowHeight={() => "auto"}
            rows={dogList}
            columns={cols}
            checkboxSelection={true}
            keepNonExistentRowsSelected
            sx={{ border: 0, fontSize: 20 }}
            onRowSelectionModelChange={(newRowSelectionModel) => handleRowModelChange(newRowSelectionModel)}
            rowSelectionModel={selectedDogs}
            isRowSelectable={(params) => selectedDogs.length < 100}
        />)
}

export default DisplayGrid