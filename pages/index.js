// import Head from 'next/head'
import { CircularProgress, Container, Grid, Paper } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux'
import { getAlbums, setLoading, sortAlbums } from '../redux/actions/albumsAction'
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Box } from '@mui/system';
import Link from 'next/link'

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const Home = (props) => {

  const [albums, setAlbums] = useState([]);
  const [sort, setSort] = useState(1);

  useEffect(() => {
    setAlbums(props.albums);
  }, [props.albums]);


  return (
    <div>
      <Container sx={{ marginTop: '10px;' }}>
        <Grid container spacing={2}>
          {props.loading &&
            <Box direction="row" justifyContent="center" sx={{ display: 'flex', width: '100%', marginTop: '150px' }}>
              <CircularProgress />
            </Box>
          }
          {albums.map((item, key) => {
            return (
              <Grid key={key} item sm={6} xs={12}>
                <Link href="/album/[id]" as={`/album/${item.id}`}>
                  <Paper sm={{ textAlign: 'center' }} sx={{ p: 2, margin: 'auto', flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item>
                        {/* {(undefined !== item['photos'] && item['photos'].length) && */}
                        <ButtonBase sx={{ width: 128, height: 128 }}>
                          <Img alt="complex" src={item.photos?.[0].thumbnailUrl} />
                        </ButtonBase>
                        {/* } */}
                      </Grid>
                      <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                          <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" component="div">
                              {item.title}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              {(undefined !== item['photos'] && item['photos'].length) ?
                                "(" + item['photos'].length + " photos)" : ""}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Link>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => ({
  albums: state.albumReducer.albums,
  loading: state.albumReducer.loading,
})

export default connect(mapStateToProps, { getAlbums, setLoading, sortAlbums })(Home);

