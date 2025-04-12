from scapy.all import get_if_list, sniff

def list_interfaces():
    interfaces = get_if_list()
    print("\nAvailable interfaces:")
    for i, iface in enumerate(interfaces):
        print(f"{i}: {iface}")
    return interfaces

def capture_packets():
    interfaces = list_interfaces()
    try:
        choice = int(input("\nEnter the number of the interface to use: "))
        selected_iface = interfaces[choice]
        print(f"\n[*] Capturing on interface: {selected_iface}\n")
        packets = sniff(iface=selected_iface, count=10,timeout=15)
        packets.summary()
    except (IndexError, ValueError):
        print("Invalid selection. Please run the program again.")

capture_packets()
