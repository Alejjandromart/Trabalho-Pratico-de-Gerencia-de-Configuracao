"""
Módulo de Conversão de Unidades
Autor: Alejjandro Martins
Disciplina: Gerência de Configuração
"""

def celsius_para_fahrenheit(celsius: float) -> float:
    """Converte temperatura de Celsius para Fahrenheit."""
    return (celsius * 9 / 5) + 32


def fahrenheit_para_celsius(fahrenheit: float) -> float:
    """Converte temperatura de Fahrenheit para Celsius."""
    return (fahrenheit - 32) * 5 / 9


def quilometros_para_milhas(km: float) -> float:
    """Converte distância de Quilômetros para Milhas."""
    return km * 0.621371


def milhas_para_quilometros(milhas: float) -> float:
    """Converte distância de Milhas para Quilômetros."""
    return milhas / 0.621371


def menu():
    print("=" * 40)
    print("      CONVERSOR DE UNIDADES")
    print("=" * 40)
    print("1. Celsius -> Fahrenheit")
    print("2. Fahrenheit -> Celsius")
    print("3. Quilômetros -> Milhas")
    print("4. Milhas -> Quilômetros")
    print("0. Sair")
    print("=" * 40)


def main():
    while True:
        menu()
        opcao = input("Escolha uma opção: ").strip()

        if opcao == "0":
            print("Encerrando conversor. Até logo!")
            break
        elif opcao == "1":
            val = float(input("Digite o valor em Celsius (°C): "))
            print(f"Resultado: {val}°C = {celsius_para_fahrenheit(val):.2f}°F\n")
        elif opcao == "2":
            val = float(input("Digite o valor em Fahrenheit (°F): "))
            print(f"Resultado: {val}°F = {fahrenheit_para_celsius(val):.2f}°C\n")
        elif opcao == "3":
            val = float(input("Digite a distância em Km: "))
            print(f"Resultado: {val} km = {quilometros_para_milhas(val):.2f} milhas\n")
        elif opcao == "4":
            val = float(input("Digite a distância em Milhas: "))
            print(f"Resultado: {val} milhas = {milhas_para_quilometros(val):.2f} km\n")
        else:
            print("Opção inválida! Tente novamente.\n")


if __name__ == "__main__":
    main()