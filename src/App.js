import React, { Component } from 'react';
import './App.css';
import Tile from './Tile';
import { Input, Layout, Menu, Icon } from 'antd';
import metadata from 'pokemon-metadata';
const { Sider, Content } = Layout;
const Search = Input.Search;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchTerm: "",
      pokemon: [],
      collapsed: false,
      mode: 'inline',
      statSort: 'speed',
    }
  }

  componentWillMount() {
    fetch(`https://pokeapi.co/api/v2/generation/1/`)
      .then((response) => {
        response.json()
          .then((data) => {
            this.setState({pokemon: data.pokemon_species})
          })
      })
  }

  sortById = (a, b) => {
    return metadata[a.name].id - metadata[b.name].id
  }

  sortByStat = (stat) => (a, b) => {
    const first = metadata[a.name].stats.find(s => s.stat.name === stat)
    const second = metadata[b.name].stats.find(s => s.stat.name === stat)
    return second.base_stat - first.base_stat;
  }

  matchesSearch = (pokemon) => {
    return pokemon.name.includes(this.state.searchTerm)
  }

  renderTile = (pokemon) => {
    return <Tile name={pokemon.name} key={pokemon.name} />
  }

  handleMenuClick = ({ item }) => {
    this.setState({ statSort: item.props.name });
  }

  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  }

  render() {
    return (
      <Layout className="App">
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          style={{ overflow: 'auto' }}
        >
          <div className="SearchBar">
            <Search
              placeholder="input search text"
              onSearch={value => this.setState({searchTerm: value})}
              onChange={e =>{
                this.setState({searchTerm: e.target.value})}
              }
            />
          </div>
          <Menu
            theme="dark"
            mode={this.state.mode}
            defaultSelectedKeys={['0']}
            onClick={this.handleMenuClick}
          >
            <Menu.Item key={0} name="speed">
              <span>
                <Icon type="double-right" />
                <span className="nav-text">Speed</span>
              </span>
            </Menu.Item>

            <Menu.Item key={1} name="special-defense">
              <span>
                <Icon type="star-o" />
                <span className="nav-text">Special Defense</span>
              </span>
            </Menu.Item>

            <Menu.Item key={2} name="special-attack">
              <span>
                <Icon type="star" />
                <span className="nav-text">Special Attack</span>
              </span>
            </Menu.Item>

            <Menu.Item key={3} name="defense">
              <span>
                <Icon type="safety" />
                <span className="nav-text">Defense</span>
              </span>
            </Menu.Item>

            <Menu.Item key={4} name="attack">
              <span>
                <Icon type="rocket" />
                <span className="nav-text">Attack</span>
              </span>
            </Menu.Item>

            <Menu.Item key={5} name="hp">
              <span>
                <Icon type="heart-o" />
                <span className="nav-text">Hit Points</span>
              </span>
            </Menu.Item>

          </Menu>
        </Sider>
        <Layout>
          <Content style={{overflow: 'initial'}}>
            <div className="Body">
              {
                this.state.pokemon
                  .filter(this.matchesSearch)
                  .sort(this.sortByStat(this.state.statSort))
                  .map(this.renderTile)
              }
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
