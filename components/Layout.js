import Navbar from "./Navbar";
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { getAlbums, setLoading } from '../redux/actions/albumsAction'

const Layout = (props) => {

    const [albums, setAlbums] = useState([]);

    useEffect(async () => {
        props.getAlbums();
    }, []);

    useEffect(() => {
        setAlbums(props.albums);
        // console.log(props.albums);
    }, [props.albums]);

    return (
        <div>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
            </Head>
            <Navbar />
            <main>
                {props.children}
            </main>
        </div>
    );
}

// export default Layout;

const mapStateToProps = (state) => ({
    albums: state.albumReducer.albums,
})

export default connect(mapStateToProps, { getAlbums, setLoading })(Layout);