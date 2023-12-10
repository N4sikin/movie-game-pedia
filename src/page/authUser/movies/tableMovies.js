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
    InputLabel,
    MenuItem,
    FormControl,
    Select,
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

const TableMovies = () => {
    const { success, setSuccess, successMsg, errorDeleteMovie, authAction } = useContext(AuthContext)
    const { cekLogin, deleteDataMovie } = authAction

    const { dataPublicMovies, action } = useContext(PublicContext)
	const { fetchPublicDataMovies } = action

    const history = useHistory()
    const [open, setOpen] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [fixSearch, setFixSearch] = useState('')
    const [yearFilter, setYearFilter] = useState('')
    const [ratingFilter, setRatingFilter] = useState('')
    const [genreFilter, setGenreFilter] = useState('')
    const [_sortBy, setSortBy] = useState('rating')
    const [_sortType, setSortType] = useState('desc')
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {

        fetchPublicDataMovies()
        cekLogin()

    }, []) // eslint-disable-next-line

    const handleSearch = e => {
        e.preventDefault()
        setFixSearch(searchTerm)
    }

    const handleChangeAccordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    const handleChangeRating = (event) => {
        setRatingFilter(event.target.value)
    }

    const FilterYear = () => {
        const yearOption = []
        for (let i = 1980; i < 2022; i++) {
            yearOption.push(String(i))
        }
        return (
            <Autocomplete
                value={yearFilter}
                onChange={(event, newValue) => {
                    setYearFilter(newValue);
                }}
                id="year-states-demo"
                options={yearOption}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Year" />}
            />
        )
    }

    const FilterGenre = () => {
        const genreOption = []
        if (dataPublicMovies.length > 0) {
            dataPublicMovies.map(item => {
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
                id="controllable-states-demo"
                options={genreOption}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Genre" />}
            />
        )
    }

    const handleNewData = () => {
        history.push('/table-movies/create')
    }

    const handleDelete = (e) => {
        deleteDataMovie(e.target.value).then(() => {
            fetchPublicDataMovies()
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

    const LoopingRowMovie = () => {
        const arrCard = []

        if (dataPublicMovies.length > 0) {
            const tmpData = []
            dataPublicMovies.map((item, index) => {
                return tmpData.push(
                {
                    id: item.id,
                    title: item.title !== null ? item.title : '',
                    description: item.description !== null ? item.description : '',
                    year: item.year !== null ? item.year : 0,
                    duration: item.duration !== null ? item.duration : 0,
                    genre: item.genre !== null ? item.genre : '',
                    rating: item.rating !== null ? item.rating : '',
                    review: item.review !== null ? item.review : '',
                    image: item.image !== null ? item.image : '',
                    created: item.created,
                    updated: item.updated
                }
                )
            })
            const queryLowered = fixSearch.trim()
            const filteredData = tmpData.filter(f => (f.title.toLowerCase().includes(queryLowered) || f.description.toLowerCase().includes(queryLowered) || f.review.toLowerCase().includes(queryLowered)) && (f.year === (Number(yearFilter) || f.year)) && (f.rating === (Number(ratingFilter) || f.rating)) && f.genre.toLowerCase().includes(genreFilter !== null ? genreFilter : '')
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
                        <td data-header="Title" className="title">{item.title !== null && item.title !== '' ? item.title : 'No Data'}</td>
                        <td data-header="Description">{item.description !== null && item.description !== '' ? `${item.description.slice(0, 150)} ${item.description.length > 150 ? '...' : ''}` : 'No Description'}</td>
                        <td data-header="Year">{item.year !== null && item.year !== '' ? item.year : 0}</td>
                        <td data-header="Duration">{item.duration !== null && item.duration !== '' ? item.duration : 0} Minute</td>
                        <td data-header="Genre">{item.genre !== undefined && item.genre !== null && item.genre !== '' ? genre(item.genre) : '-'}</td>
                        <td data-header="Rating">{item.rating !== null && item.rating !== '' ? item.rating : 0}/10</td>
                        <td data-header="Review">{item.review !== null && item.review !== '' ? `${item.review.slice(0, 150)} ${item.review.length > 150 ? '...' : ''}` : 'No Review'}</td>
                        <th scope="row">
                            <div className="toolbox">
                                <Link to={`/table-movies/edit/${item.id}`} className='link'>
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
        <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={success} autoHideDuration={1000} onClose={() => setSuccess(false)}>
            <CustomAlert onClose={() => setSuccess(false)} severity="success" sx={{ width: '100%' }}>
                {successMsg}
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
                {errorDeleteMovie}
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
                            <FilterYear />
                        </FormControl>
                        <FormControl fullWidth sx={{ width: { md: '300px', sm: '300px', xs: '100%' }, marginBottom: { md: 0, sm: '10px', xs: '10px' }  }}>
                            <InputLabel id="demo-filterrating">Rating</InputLabel>
                            <Select
                            labelId="demo-filterrating"
                            id="filterrating"
                            value={ratingFilter}
                            label="Rating"
                            onChange={handleChangeRating}
                            >
                                <MenuItem value="">Tanpa Rating</MenuItem>
                                <MenuItem value={0}>0</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                            </Select>
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
                        <th scope="col" data-item='title' data-label={_sortType} onClick={hanldeSort}>Title {_sortBy === 'title' ? _sortType === 'desc' ? <ArrowUpwardIcon sx={{ fontSize: 11 }} /> : <ArrowDownwardIcon sx={{ fontSize: 11 }} /> : null}</th>
                        <th scope="col" data-item='description' data-label={_sortType} onClick={hanldeSort}>Description {_sortBy === 'description' ? _sortType === 'desc' ? <ArrowUpwardIcon sx={{ fontSize: 11 }} /> : <ArrowDownwardIcon sx={{ fontSize: 11 }} /> : null}</th>
                        <th scope="col" data-item='year' data-label={_sortType} onClick={hanldeSort}>year {_sortBy === 'year' ? _sortType === 'desc' ? <ArrowUpwardIcon sx={{ fontSize: 11 }} /> : <ArrowDownwardIcon sx={{ fontSize: 11 }} /> : null}</th>
                        <th scope="col" data-item='duration' data-label={_sortType} onClick={hanldeSort}>duration {_sortBy === 'duration' ? _sortType === 'desc' ? <ArrowUpwardIcon sx={{ fontSize: 11 }} /> : <ArrowDownwardIcon sx={{ fontSize: 11 }} /> : null}</th>
                        <th scope="col" data-item='genre' data-label={_sortType} onClick={hanldeSort}>genre {_sortBy === 'genre' ? _sortType === 'desc' ? <ArrowUpwardIcon sx={{ fontSize: 11 }} /> : <ArrowDownwardIcon sx={{ fontSize: 11 }} /> : null}</th>
                        <th scope="col" data-item='rating' data-label={_sortType} onClick={hanldeSort}>rating {_sortBy === 'rating' ? _sortType === 'desc' ? <ArrowUpwardIcon sx={{ fontSize: 11 }} /> : <ArrowDownwardIcon sx={{ fontSize: 11 }} /> : null}</th>
                        <th scope="col" data-item='review' data-label={_sortType} onClick={hanldeSort}>review {_sortBy === 'review' ? _sortType === 'desc' ? <ArrowUpwardIcon sx={{ fontSize: 11 }} /> : <ArrowDownwardIcon sx={{ fontSize: 11 }} /> : null}</th>
                        <th scope="col" className="column-primary">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <LoopingRowMovie />
                </tbody>
            </table>
            <Stack spacing={2} sx={{ width: '98%', margin: '20px auto' }}>
                <Pagination count={totalPage === 0 ? dataPublicMovies.length < 10 ? 1 : dataPublicMovies.length % 10 === 0 ? parseInt(dataPublicMovies.length / 10) : (parseInt(dataPublicMovies.length / 10) + 1) : totalPage} page={currentPage} onChange={handlePagination} color="primary" sx={{ margin: '0 auto' }} />
            </Stack>
        </Paper>
        </>
    )
}

export default TableMovies