import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'


const headerProps = {
    icon: 'shopping-basket',
    title: 'Compras',
    subtitle: 'Cadastro de compras: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/compras'
const initialState = {
    compra: { id_user: '', id_product: '', price:'', amount:'' },
    list: []
}

export default class Compras extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ compra: initialState.compra })
    }

    save() {
        const compra = this.state.compra
        const method = compra.id ? 'put' : 'post'
        const url = compra.id ? `${baseUrl}/${compra.id}` : baseUrl
        axios[method](url, compra)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ compra: initialState.compra, list })
            })
    }

    getUpdatedList(compra, add = true) {
        const list = this.state.list.filter(u => u.id !== compra.id)
        if(add) list.unshift(compra)
        return list
    }

    updateField(event) {
        const compra = { ...this.state.compra }
        compra[event.target.name] = event.target.value
        this.setState({ compra })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Usuario</label>
                            <input type="text" className="form-control"
                                name="user"
                                value={this.state.compra.id_user}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o Usuario..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Descrição</label>
                            <input type="text" className="form-control"
                                name="id_product"
                                value={this.state.compra.id_product}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a descrição..." />
                        </div>
                    </div>
                    
                </div>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Preço</label>
                            <input type="text" className="form-control"
                                name="price"
                                value={this.state.compra.price}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o preço..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Quantidade</label>
                            <input type="text" className="form-control"
                                name="amount"
                                value={this.state.compra.amount}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a quantidade..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(compra) {
        this.setState({ compra })
    }

    remove(compra) {
        axios.delete(`${baseUrl}/${compra.id}`).then(resp => {
            const list = this.getUpdatedList(compra, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>user</th>
                        <th>product</th>
                        <th>amount</th>
                        <th>price</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(compra => {
            return (
                <tr key={compra.id}>
                    <td>{compra.id}</td>
                    <td>{compra.id_user}</td>
                    <td>{compra.id_product}</td>   
                    <td>{compra.amount}</td>                 
                    <td>{compra.price}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(compra)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(compra)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    
    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}