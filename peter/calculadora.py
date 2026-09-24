def somar(a, b):
    return a + b

def subtrair(a, b):
    return a - b

def multiplicar(a, b):
    return a * b

def dividir(a, b):
    if b == 0:
        raise ZeroDivisionError("Divisão por zero não é permitida.")
    return a / b

def potencia(a, b):
    return a ** b

def resto_divisao(a, b):
    if b == 0:
        raise ZeroDivisionError("Divisão por zero não é permitida.")
    return a % b

def obter_numero(mensagem):
    while True:
        try:
            return float(input(mensagem))
        except ValueError:
            print("Entrada inválida! Por favor, digite um número válido.")

def menu():
    print("\n" + "=" * 35)
    print("       CALCULADORA INTERATIVA      ")
    print("=" * 35)
    print("1. Adição (+)")
    print("2. Subtração (-)")
    print("3. Multiplicação (*)")
    print("4. Divisão (/)")
    print("5. Potenciação (^)")
    print("6. Resto da Divisão (%)")
    print("0. Sair")
    print("=" * 35)

def main():
    while True:
        menu()
        opcao = input("Escolha uma opção (0-6): ").strip()

        if opcao == "0":
            print("\nEncerrando a calculadora. Até mais!")
            break

        operacoes = {
            "1": ("Soma", somar, "+"),
            "2": ("Subtração", subtrair, "-"),
            "3": ("Multiplicação", multiplicar, "*"),
            "4": ("Divisão", dividir, "/"),
            "5": ("Potenciação", potencia, "^"),
            "6": ("Resto da Divisão", resto_divisao, "%")
        }

        if opcao in operacoes:
            nome_op, funcao, simbolo = operacoes[opcao]
            print(f"\n--- {nome_op} ---")
            num1 = obter_numero("Digite o primeiro número: ")
            num2 = obter_numero("Digite o segundo número: ")

            try:
                resultado = funcao(num1, num2)
                # Formata para inteiro se for um número inteiro exato
                if resultado.is_integer():
                    resultado_formatado = int(resultado)
                else:
                    resultado_formatado = f"{resultado:.4f}".rstrip('0').rstrip('.')

                num1_formatado = int(num1) if num1.is_integer() else num1
                num2_formatado = int(num2) if num2.is_integer() else num2

                print(f"\n Resultado: {num1_formatado} {simbolo} {num2_formatado} = {resultado_formatado}")
            except ZeroDivisionError as err:
                print(f"\n Erro: {err}")
        else:
            print("\n Opção inválida! Escolha uma opção de 0 a 6.")

if __name__ == "__main__":
    main()
