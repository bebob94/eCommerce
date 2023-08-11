package com.eCommerce.server.entity;



import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "immagini")
public class Image {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_img;
	private String name;
	private String type;
	private String url;
	@Lob
	@Basic(fetch = FetchType.LAZY)
	private byte[] data;

	

	public Image(String name, String type, byte[] data) {
		super();
		this.name = name;
		this.type = type;
		this.data = data;
	}
}
