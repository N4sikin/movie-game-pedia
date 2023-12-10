import { useEffect, useContext, forwardRef, useState } from "react"
import { Link, useHistory } from 'react-router-dom'
import { 
    Paper,
    CardMedia,
    Stack,
    Chip, 
    Box,
    IconButton,
    InputBase,
    Button,
    Snackbar,
    Collapse,
    Alert,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    CardContent,
    TextField,
    FormControl,
    Autocomplete,
    Pagination } from "@mui/material"

import SearchIcon from '@mui/icons-material/Search'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import MuiAlert from '@mui/material/Alert'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

// import context
import { PublicContext } from "../../../context/publicContext"
import { AuthContext } from "../../../context/authContext"

//import no image
import noImage from '../../../style/img/no-image.png'

const CustomAlert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  })

const TableGames = () => {
    const { successGame, setSuccessGame, successMsgGame, errorDeleteGame, authAction } = useContext(AuthContext)
    const { cekLogin, deleteDataGame } = authAction

    const { dataPublicGames, action } = useContext(PublicContext)
	const { fetchPublicDataGames } = action

    const history = useHistory()
    const [open, setOpen] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [fixSearch, setFixSearch] = useState('')
    const [releaseFilter, setReleaseFilter] = useState('')
    const [platfromFilter, setPlatformFilter] = useState('')
    const [genreFilter, setGenreFilter] = useState('')
    const [_sortBy, setSortBy] = useState('release')
    const [_sortType, setSortType] = useState('desc')
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {

        fetchPublicDataGames()
        cekLogin()

    }, []) // eslint-disable-next-line

    const handleSearch = e => {
        e.preventDefault()
        setFixSearch(searchTerm)
    }

    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    const FilterRelease = () => {
        const yearOption = []
        for (let i = 2000; i < 2022; i++) {
            yearOption.push(String(i))
        }
        return (
            <Autocomplete
                value={releaseFilter}
                onChange={(event, newValue) => {
                    setReleaseFilter(newValue);
                }}
                id="release-states-demo"
                options={yearOption}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Release" />}
            />
        )
    }

    const FilterGenre = () => {
        const genreOption = []
        if (dataPublicGames.length > 0) {
            dataPublicGames.map(item => {
                if (item.genre !== undefined && item.genre !== null) {
                    item.genre.split(',').map(itemSplit => {
                            if (genreOption.find(s => s === itemSplit.toLowerCase()) === undefined) {
                            genreOption.push(itemSplit.toLowerCase())
                        }
                    })
                }
            })
        }
        return (
            <Autocomplete
                value={genreFilter}
                onChange={(event, newValue) => {
                    setGenreFilter(newValue);
                }}
                id="genre-states-demo"
                options={genreOption}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Genre" />}
            />
        )
    }

    const FilterPlatform = () => {
        const platformOption = []
        if (dataPublicGames.length > 0) {
            dataPublicGames.map(item => {
                if (item.platform !== undefined && item.platform !== null) {
                    item.platform.split(',').map(itemSplit => {
                        if (platformOption.find(s => s === itemSplit.toLowerCase()) === undefined) {
                            platformOption.push(itemSplit.toLowerCase())
                        }
                    })
                } 
            })
        }
        return (
            <Autocomplete
                value={platfromFilter}
                onChange={(event, newValue) => {
                    setPlatformFilter(newValue);
                }}
                id="platform-states-demo"
                options={platformOption}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Platform" />}
            />
        )
    }

    const handleNewData = () => {
        history.push('/table-games/create')
    }

    const handleDelete = (e) => {
        deleteDataGame(e.target.value).then(() => {
            fetchPublicDataGames()
        }).catch(() => {
            setOpen(true)
        })
    }

    const genre = (data) => {
        const tmpData = []
        data.split(',').map((item, i) => {
            return tmpData.push(
                <Chip key={i} label={item} color="primary" variant="outlined" />
            )
        })
        return (
            <Stack direction='column' spacing={1}>
                {tmpData}
            </Stack>
        )
    }

    const type = (value) => {
        if (value === 1) {
            return (
                <Chip label='YES' color="success" variant="outlined" />
            )
        } else {
            return (
                <Chip label='NO' color="error" variant="outlined" />
            )
        }
    }

    const hanldeSort = e => {
        const headerTable = e.target.getAttribute('data-item')
        const headerLabel = e.target.getAttribute('data-label')
        const asc = 'asc'
        if (headerTable === _sortBy) {
          if (headerLabel === asc) {
            setSortType('desc')
          } else {
            setSortType('asc')
          }
        } else {
          setSortBy(headerTable)
        }
      }

    const handlePagination = (event, value) => {
        setCurrentPage(value)
      }

    const paginateArray = (array, perPage, page) => array.slice((page - 1) * perPage, page * perPage)
    const sortCompare = key => (a, b) => {
        const fieldA = a[key]
        const fieldB = b[key]
      
        let comparison = 0
        if (_sortType === 'asc') {
          if (fieldA > fieldB) {
            comparison = 1
          } else if (fieldA < fieldB) {
            comparison = -1
          }
        } else if (_sortType === 'desc') {
          if (fieldA > fieldB) {
            comparison = -1
          } else if (fieldA < fieldB) {
            comparison = 1
          }
        }
        return comparison
      }

    const LoopingRowGames = () => {
        const arrCard = []

        if (dataPublicGames.length > 0) {
            const tmpData = []
            dataPublicGames.map((item, index) => {
                return tmpData.push(
                {
                    id: item.id,
                    name: item.name !== null ? item.name : '',
                    genre: item.genre !== null ? item.genre : '',
                    singlePlayer: item.singlePlayer !== null ? item.singlePlayer : 0,
                    multiplayer: item.multiplayer !== null ? item.multiplayer : 0,
                    platform: item.platform !== null ? item.platform : '',
                    release: item.release !== null ? item.release : 0,
                    image: item.image !== null ? item.image : '',
                    created: item.created, 
                    updated: item.updated
                }
                )
            })
            const queryLowered = fixSearch.trim()
            const filteredData = tmpData.filter(f => (f.name.toLowerCase().includes(queryLowered)) && (f.release === (releaseFilter || f.release)) && f.platform.toLowerCase().includes(platfromFilter !== null ? platfromFilter : '') && f.genre.toLowerCase().includes(genreFilter !== null ? genreFilter : '')
            ).sort(sortCompare(_sortBy))
            const tampilData = paginateArray(filteredData, rowsPerPage, currentPage)
            setTotalPage(filteredData.length < 10 ? 1 : filteredData.length % 10 === 0 ? parseInt(filteredData.length / 10) : (parseInt(filteredData.length / 10) + 1))
            tampilData.map((item, index) => {
                return arrCard.push(
                    <tr key={item.id}>
                        <td data-header="Image">
                        <CardMedia
                            component="img"
                            alt="Image Game"
                            width="100"
                            image={item.image !== null && item.image !== '' && item.image.indexOf('http') !== -1 ? item.image : noImage}
                        />
                        </td>
                        <td data-header="Name" className="title">{item.name !== null && item.name !== '' ? item.name : 'No Data'}</td>
                        <td data-header="Release">{item.release !== undefined && item.release !== null && item.release !== '' ? item.release : '-'}</td>
                        <td data-header="Genre">{item.genre !== undefined && item.genre !== null && item.genre !== '' ? genre(item.genre) : '-'}</td>
                        <td data-header="Platform">{item.platform !== undefined && item.platform !== null && item.platform !== '' ? item.platform : '-'}</td>
                        <td data-header="Single Player">{item.singlePlayer !== undefined && item.singlePlayer !== null && item.singlePlayer !== '' ? type(item.singlePlayer) : <Chip label='NO' color="error" variant="outlined" />}</td>
                        <td data-header="Multi Player">{item.multiplayer !== undefined && item.multiplayer !== null && item.multiplayer !== '' ? type(item.multiplayer) : <Chip label='NO' color="error" variant="outlined" />}</td>
                        <th scope="row">
                            <div className="toolbox">
                                <Link to={`/table-games/edit/${item.id}`} className='link'>
                                    <Button variant="contained" startIcon={<EditIcon />} color='warning'>
                                        Edit
                                    </Button>
                                </Link>
                            <Button value={item.id} variant="outlined" startIcon={<DeleteIcon />} color='error' sx={{ marginTop: '7px' }} onClick={handleDelete}>
                                Delete
                            </Button>
                            </div>
                        </th>
                    </tr>
                )
            })
        }
        return arrCard
    }
 
    return (
        <>
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={successGame} autoHideDuration={1000} onClose={() => setSuccessGame(false)}>
            <CustomAlert onClose={() => setSuccessGame(false)} severity="success" sx={{ width: '100%' }}>
                {successMsgGame}
            </CustomAlert>
        </Snackbar>
        <Box sx={{ width: '100%' }}>
            <Collapse in={open}>
                <Alert
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setOpen(false);
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
                severity="error"
                >
                {errorDeleteGame}
                </Alert>
            </Collapse>
        </Box>
        <Paper sx={{ overflowX: 'auto' }}>
            <Box sx={{ padding: '10px', display: { md: 'flex', sm: 'flex', xs: 'block' }, justifyContent: 'space-between' }}>
                <Paper
                component="form"
                onSubmit={handleSearch}
                elevation={3}
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', minWidth: {md: '400px', sm: '400px', xs: '200px'}, maxWidth: '400px' }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <IconButton type='submit' sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <Button sx={{ marginTop: {md: 0, sm: 0, xs: '10px'}, padding: '10px' }} variant="contained" onClick={handleNewData}>New Data</Button>
            </Box>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChangeAccordion('panel1')} sx={{ border: '1px solid blue', marginBottom: '10px' }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Typography sx={{ width: '90%' }}>
                    Filter
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <CardContent sx={{ width: '95%' }}>
                    <div className="mb-1">
                        <Box sx={{ display: { md: 'flex', sm: 'block', xs: 'block' }, justifyContent: 'space-between' }}>
                        <FormControl fullWidth sx={{ width: { md: '300px', sm: '300px', xs: '100%' } }}>
                            <FilterRelease />
                        </FormControl>
                        <FormControl fullWidth sx={{ width: { md: '300px', sm: '300px', xs: '100%' }, marginBottom: { md: 0, sm: '10px', xs: '10px' }  }}>
                            <FilterPlatform />
                        </FormControl>
                        <FormControl fullWidth sx={{ width: { md: '300px', sm: '300px', xs: '100%' } }}>
                            <FilterGenre />
                        </FormControl>
                        </Box>
                    </div>
                </CardContent>
                </AccordionDetails>
            </Accordion>
            <table className="custom-table responsive">
                <thead>
                    <tr>
                        <th scope="col" className="column-primary" data-item='image' data-header="Movie" data-label={_sortType} onClick={hanldeSort}>Image {_sortBy === 'image' ? _sortType === 'desc' ? <ArrowUpwardIcon sx={{ fontSize: 11 }} /> : <ArrowDownwardIcon sx={{ fontSize: 11 }} /> : null}</th>
                        <th scope="col" data-item='name' data-label={_sortType} onClick={hanldeSort}>Name {_sortBy === 'name' ? _sortType === 'desc' ? <ArrowUpwardIcon sx={{ fontSize: 11 }} /> : <ArrowDownwardIcon sx={{ fontSize: 11 }} /> : null}</th>
                        <th scope="col" data-item='release' data-label={_sortType} onClick={hanldeSort}>Release {_sortBy === 'release' ? _sortType === 'desc' ? <ArrowUpwardIcon sx={{ fontSize: 11 }} /> : <ArrowDownwardIcon sx={{ fontSize: 11 }} /> : null}</th>
                        <th scope="col" data-item='genre' data-label={_sortType} onClick={hanldeSort}>Genre {_sortBy === 'genre' ? _sortType === 'desc' ? <ArrowUpwardIcon sx={{ fontSize: 11 }} /> : <ArrowDownwardIcon sx={{ fontSize: 11 }} /> : null}</th>
                        <th scope="col" data-item='platform' data-label={_sortType} onClick={hanldeSort}>Platform {_sortBy === 'platform' ? _sortType === 'desc' ? <ArrowUpwardIcon sx={{ fontSize: 11 }} /> : <ArrowDownwardIcon sx={{ fontSize: 11 }} /> : null}</th>
                        <th scope="col" data-item='singlePlayer' data-label={_sortType} onClick={hanldeSort}>Single Player {_sortBy === 'singlePlayer' ? _sortType === 'desc' ? <ArrowUpwardIcon sx={{ fontSize: 11 }} /> : <ArrowDownwardIcon sx={{ fontSize: 11 }} /> : null}</th>
                        <th scope="col" data-item='multiplayer' data-label={_sortType} onClick={hanldeSort}>Multi Player {_sortBy === 'multiplayer' ? _sortType === 'desc' ? <ArrowUpwardIcon sx={{ fontSize: 11 }} /> : <ArrowDownwardIcon sx={{ fontSize: 11 }} /> : null}</th>
                        <th scope="col" className="column-primary">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <LoopingRowGames />
                </tbody>
            </table>
            <Stack spacing={2} sx={{ width: '98%', margin: '20px auto' }}>
                <Pagination count={totalPage === 0 ? dataPublicGames.length < 10 ? 1 : dataPublicGames.length % 10 === 0 ? parseInt(dataPublicGames.length / 10) : (parseInt(dataPublicGames.length / 10) + 1) : totalPage} page={currentPage} onChange={handlePagination} color="primary" sx={{ margin: '0 auto' }} />
            </Stack>
        </Paper>
        </>
    )
}

export default TableGames