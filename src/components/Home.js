import React, { PureComponent } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Container, Header, Body, Content, Title, Text, View } from 'native-base'
import GridView from 'react-native-super-grid'
import SoundPlayer from 'react-native-sound-player'
import data from '../data/sounds.json'

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

  render () { 
    return (
      <Container>
        <Header>
          <Body>
            <Title> X </Title>
          </Body>
        </Header>
        <Content>
          <GridView
            itemDimension={130}
            items={data}
            style={styles.gridView}
            renderItem={item => (
              <TouchableOpacity style={[styles.itemContainer]} onPress={() => this.playSound(item)}>
                <Text style={styles.itemName}>{item.name}</Text>
              </TouchableOpacity>
            )}
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
    borderRadius: 5,
    padding: 10,
    height: 150,
    backgroundColor: '#ffc000'
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
})

export default Home
