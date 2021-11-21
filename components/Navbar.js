import { AppBar, createStyles, MenuItem, Select, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link'
import { connect } from 'react-redux';
import { sortAlbums, setLoading } from '../redux/actions/albumsAction';

const useStyles = makeStyles((theme) =>
    createStyles({
        // selectRoot: {
        //     color: "white !important",
        // }
    }),
);

const Navbar = (props) => {

    const classes = useStyles();
    const [sort, setSort] = useState(1);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        setAlbums(props.albums);
    }, [props.albums]);

    useMemo(() => {
        props.sortAlbums(albums, sort)
    }, [sort]);

    return (
        <AppBar position="static">
            <Toolbar>
                <Link href='/'>
                    <Typography variant="h5" sx={{ flexGrow: 1 }}>My Albums</Typography>
                </Link>
                <Select
                    variant="standard"
                    value={sort}
                    className={classes.selectRoot}
                    onChange={e => setSort(e.target.value)}
                >
                    <MenuItem className={classes.menuItem} value={1}>Default sort</MenuItem>
                    <MenuItem className={classes.menuItem} value={2}>Sort by Title ASC</MenuItem>
                    <MenuItem className={classes.menuItem} value={3}>Sort by Title DESC</MenuItem>
                </Select>
            </Toolbar>
        </AppBar>
    )
}

// export default Navbar;

const mapStateToProps = (state) => ({
    albums: state.albumReducer.albums,
})

export default connect(mapStateToProps, { sortAlbums, setLoading })(Navbar);