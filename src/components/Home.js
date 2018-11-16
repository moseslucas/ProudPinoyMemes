import React, { PureComponent } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Container, Header, Body, Content, Title, Text, View } from 'native-base'
import GridView from 'react-native-super-grid'
import SoundPlayer from 'react-native-sound-player'
import data from '../data/sounds.json'

class Home extends PureComponent {
  state = { playing: false }

  componentDidMount() {
    SoundPlayer.onFinishedPlaying((success: boolean) => {
      success && this.setState({ playing: false })
    })
  }

  playSound () {
    const { playing } = this.state
    playing
      ? this.setState({ playing: false }, () => SoundPlayer.stop())
      : this.setState({ playing: true }, () => SoundPlayer.playSoundFile('milyon_pans', 'mp3'))
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
              <TouchableOpacity style={[styles.itemContainer]} onPress={() => this.playSound()}>
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
