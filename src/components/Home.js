import React, { PureComponent } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Container, Header, Body, Content, Title, Text, View, Thumbnail } from 'native-base'
import GridView from 'react-native-super-grid'
import SoundPlayer from 'react-native-sound-player'
import memes from '../data/memes'

class Home extends PureComponent {
  state = { playing: false, currentlyPlaying: ''}

  componentDidMount() {
    SoundPlayer.onFinishedPlaying((success: boolean) => {
      success && this.setState({ playing: false })
    })
  }

  playSound (item) {
    const { playing, currentlyPlaying } = this.state

    if (playing) {
      if (currentlyPlaying !== item.name) {
        this.setState({ currentlyPlaying: item.name }, () => SoundPlayer.playSoundFile(item.audio, item.format))
      } else {
        this.setState({ playing: false, currentlyPlaying: ''}, () => SoundPlayer.stop())
      }
    } else {
      this.setState({ playing: true, currentlyPlaying: item.name }, () => SoundPlayer.playSoundFile(item.audio, item.format))
    }
  }

  renderItem = item => {
    const { currentlyPlaying } = this.state
    const active = currentlyPlaying === item.name
    return (
      <TouchableOpacity
        onPress={() => this.playSound(item)}
        style={[styles.itemContainer, {backgroundColor: active ? '#FE595F' : '#fff' }]}
      >
        <Thumbnail large source={item.image} />
        <Text style={[styles.itemName, {color: active ? '#fff' : '#3a3a3a'}]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    )
  }

  render () { 
    return (
      <Container>
        <Header style={{backgroundColor: '#FE595F'}} androidStatusBarColor='#FE595F'>
          <Body>
            <Title style={{alignSelf: 'center'}}>
              PeEnoiSE SouNd BOaRd
            </Title>
          </Body>
        </Header>
        <Content style={{backgroundColor: '#f7f7f7'}}>
          <GridView
            itemDimension={130}
            items={memes}
            style={styles.gridView}
            renderItem={this.renderItem}
          />
        </Content>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    height: 150,
    elevation: 10
  },
  itemName: {
    paddingTop: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
})

export default Home
