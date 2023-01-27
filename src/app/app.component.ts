import { Component, OnInit } from '@angular/core';
import YASMIJ from '../assets/YASMIJ.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tipos = [
    { value: 'minimize', label: 'Minimizar' },
    { value: 'maximize', label: 'Maximizar' },
  ];
  tipoSelecionado = 'minimize';
  funcaoObjetivo = '';
  restricoes: { valor: string }[] = [{ valor: '' }];

  resultado: string = '';

  ngOnInit(): void {}

  adicionarRestricao() {
    this.restricoes = [...this.restricoes, { valor: '' }];
  }

  removerRestricao() {
    const newRestricoes = [...this.restricoes];
    newRestricoes.splice(newRestricoes.length - 1, 1);
    this.restricoes = newRestricoes;
  }

  resolverSimplex() {
    const input = {
      type: this.tipoSelecionado,
      objective: this.funcaoObjetivo,
      constraints: this.restricoes.map((rest) => rest.valor),
    };

    const output = YASMIJ.solve(input);
    this.resultado = JSON.stringify(output)
      .replaceAll(`"`, '')
      .replaceAll('{', '')
      .replaceAll('}', '')
      .replace('result:', '')
      .replaceAll(',', ', ')
      .replaceAll('slack', 'folga')
      .replaceAll(':', '=');
  }

  limpar() {
    this.funcaoObjetivo = '';
    this.restricoes = [{ valor: '' }];
  }
}
