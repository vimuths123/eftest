// import Head from 'next/head'
import { CircularProgress, Container, Grid, ImageList, ImageListItem, ListItem, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { setLoading } from '../../../redux/actions/albumsAction'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useRouter } from 'next/router'

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const Album = (props) => {

  const router = useRouter()
  const { id } = router.query
  const [album, setAlbum] = useState([]);

  useEffect(() => {
    props.albums.map((item, key) => {
      if (item.id == id && item.photos !== undefined) {
        setAlbum(item);
      }
    })
  }, [props.albums]);

  return (
    <div>
      <Container sx={{ marginTop: '10px;' }}>
        <Typography variant="h5" sx={{ flexGrow: 1, marginBottom: '10px' }}>{album?.title}</Typography>
        <Grid container spacing={1}>
          {props.loading &&
            <Box direction="row" justifyContent="center" sx={{ display: 'flex', width: '100%', marginTop: '150px' }}>
              <CircularProgress />
            </Box>
          }
          {album.photos?.map((item, key) => {
            return (
              <Grid key={key} item sm={3} xs={6}>
                <Img sx={{ width: '100%' }} alt="complex" src={item.url} />
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </div >
  )
}

const mapStateToProps = (state) => ({
  albums: state.albumReducer.albums,
  loading: state.albumReducer.loading,
})

export default connect(mapStateToProps, { setLoading })(Album);

