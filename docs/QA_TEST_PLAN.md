# Plano de Teste de QA - Website Radio Hotel

## 1. Introdução

Este documento descreve o plano de teste para o website do Radio Hotel. O objetivo é garantir a qualidade do site em termos de funcionalidade, usabilidade, desempenho e compatibilidade.

## 2. Escopo

### Em Escopo:

*   **Funcionalidades Principais:**
    *   Navegação (links, menus)
    *   Troca de idioma
    *   Formulários (contato, reserva - se aplicável)
    *   Visualização de conteúdo (páginas, blog)
*   **Usabilidade:**
    *   Intuitividade da interface
    *   Facilidade de navegação
    *   Responsividade em diferentes dispositivos (desktop, tablet, mobile)
*   **Desempenho:**
    *   Tempo de carregamento da página
    *   Otimização de imagens
*   **Compatibilidade:**
    *   Navegadores modernos (Chrome, Firefox, Safari, Edge)

### Fora de Escopo:

*   Testes de segurança aprofundados (ex: testes de penetração)
*   Testes de carga e estresse em nível de servidor
*   Compatibilidade com navegadores legados (ex: Internet Explorer)

## 3. Estratégia de Teste

### 3.1. Testes Funcionais

*   **Manuais:** Executar casos de teste para validar as funcionalidades principais.
*   **Automatizados:** Revisar e executar os testes e2e existentes para garantir que as funcionalidades críticas continuam funcionando.

### 3.2. Testes de Usabilidade

*   Avaliação heurística da interface para identificar problemas de usabilidade.
*   Teste de responsividade usando as ferramentas de desenvolvedor do navegador.

### 3.3. Testes de Desempenho

*   Utilizar o Google Lighthouse para medir o desempenho do site e identificar oportunidades de otimização.

### 3.4. Testes de Compatibilidade

*   Verificar a renderização e o funcionamento do site nos navegadores de destino.

## 4. Critérios de Aceitação

*   **Funcionalidade:** Todas as funcionalidades em escopo devem funcionar conforme o esperado, sem erros críticos.
*   **Usabilidade:** A interface deve ser considerada intuitiva e fácil de usar.
*   **Desempenho:** A pontuação do Lighthouse para desempenho deve ser de pelo menos 80.
*   **Compatibilidade:** O site deve ser renderizado corretamente e ser funcional em todos os navegadores de destino.

## 5. Entregáveis

*   Um relatório de QA (`QA_REPORT.md`) documentando todos os problemas encontrados, com passos para reprodução e evidências.